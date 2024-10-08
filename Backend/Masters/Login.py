from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User
from django.conf import settings
from datetime import datetime, timedelta
import jwt
import json
from .models import *
import platform
import uuid
from screeninfo import get_monitors
from django.utils import timezone

import uuid  # To generate API key
import hashlib
import secrets
import string
# SECRET_KEY = settings.SECRET_KEY

import random
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from django.http import JsonResponse
from django.utils import timezone
SECRET_KEY = 'vesoftometic_123'










@csrf_exempt
def get_Location_data_for_login(request):
    api_key = request.headers.get('Apikey')
    api_password = request.headers.get('Apipassword')
    username = request.GET.get('username', '').strip()
    # Validate API credentials
    is_valid_credentials = credential_request(api_key, api_password)
    if not is_valid_credentials['success']:
        return JsonResponse({'message': is_valid_credentials['message']}, status=is_valid_credentials['status'])
    if username:
        
        try:
            user = UserRegister_Master_Details.objects.get(auth_user_id__username=username)
            user_locations = user.Locations.all()
            locations = []
            for loc in user_locations:
                locations.append({'id':loc.Location_Id,'name':loc.Location_Name})
            if not locations:
                return JsonResponse({'message': 'No locations found for this user'})
            return JsonResponse(locations, safe=False)
        except UserRegister_Master_Details.DoesNotExist:
            return JsonResponse({'message': 'User not found'})
    return JsonResponse({'message': 'Invalid request'})
    
@csrf_exempt
def login_logic(request):
    if request.method == 'POST':
        api_key = request.headers.get('Apikey')
        api_password = request.headers.get('Apipassword')
        
        # Validate API credentials
        is_valid_credentials = credential_request(api_key, api_password)
        if not is_valid_credentials['success']:
            return JsonResponse({'message': is_valid_credentials['message']}, status=is_valid_credentials['status'])
        
        try:
            data = json.loads(request.body)
            username = data.get('UserName', '')
            password = data.get('Password', '')
            loca = data.get('Location', '')
            location = int(loca)

            if not (username and password and location):
                return JsonResponse({'success': False, 'message': 'Username, password, and location are required'}, status=200)

            try:
                # Retrieve user details
                user = UserRegister_Master_Details.objects.get(auth_user_id__username=username)

                # Check if the provided password matches the stored hashed password
                if not check_password(password, user.auth_user_id.password):
                    return JsonResponse({'success': False, 'message': 'Invalid password'}, status=200)

                # Check if the provided location matches any of the user's locations
                user_locations = user.Locations.all()
                location_names = [loc.Location_Id for loc in user_locations]

                if location not in location_names:
                    return JsonResponse({'success': False, 'message': 'Location is not valid for this user'}, status=200)

                # Check subscription expiry
                subscription = appexpiry.objects.filter(status='active').first()
                print("subscription:",subscription)
                if subscription:
                    print("jdjdjdjdjdjd")
                    current_date = datetime.now().date()
                    end_date = subscription.app_end_date
                    
                    print(current_date,end_date)
                    # If the subscription has expired and the user is not user_id 1, deny access
                    if (end_date < current_date) and (user.User_Id != 1):
                        return JsonResponse({'success': False, 'message': 'Your subscription has expired'}, status=200)

                # Generate API key and password for the session
                api_key = str(uuid.uuid4())  # Unique API key
                password_length = 12
                characters = string.ascii_letters + string.digits + string.punctuation
                api_password = ''.join(secrets.choice(characters) for i in range(password_length))

                # Hash the API password
                hashed_password = make_password(api_password)

                # Record user login session
                device_info = get_device_info()  # Retrieve device information
                session = UserLoginSession.objects.create(
                    user=user,
                    device_name=device_info['device_name'],
                    device_id=device_info['device_id'],
                    Status=True,
                    api_key=api_key,
                    api_password=hashed_password,  # Store the hashed API password
                    plain_password=api_password
                )
                session.save()

                # Generate token for authentication
                token_payload = {
                    'session_id': session.id
                }
                token = jwt.encode(token_payload, SECRET_KEY, algorithm='HS256')

                return JsonResponse({'success': True, 'message': 'Login successful', 'token': token})

            except UserRegister_Master_Details.DoesNotExist:
                return JsonResponse({'success': False, 'message': 'User not found'}, status=200)

        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'message': 'Invalid JSON'}, status=400)

    return JsonResponse({'success': False, 'message': 'Invalid request method'}, status=400)


@csrf_exempt
def location_Change(request):
    api_key = request.headers.get('Apikey')
    api_password = request.headers.get('Apipassword')
    sessionid = request.headers.get('Sessionid')
    if authenticate_request(sessionid, api_key, api_password):
        if request.method == 'POST':
            try:
                data = json.loads(request.body)
                token = jwt.encode(data, SECRET_KEY, algorithm='HS256')

                response_data = {'success': True, 'message': 'Location Changed', 'token': token}
                return JsonResponse(response_data)
            except Exception as e:
                print(f"An error occurred: {str(e)}")
                return JsonResponse({'error': 'An internal server error occurred'}), 500
            
        else:
        
            return JsonResponse({"Error": "Only POST requests are allowed."})
    else:
        return JsonResponse({'error': 'Invalid credentials'}, status=200)

#--------------------------------- device name ---------------------------------------------




def get_device_type():
    system = platform.system()

    if system == 'Windows':
        return 'Desktop'
    elif system == 'Darwin':
        return 'Desktop'
    elif system == 'Linux':
        try:
            width, height = get_screen_resolution()
            if width and height:
                diagonal_size = _calculate_diagonal_size(width, height)
                print('diagonal_size',diagonal_size)
                if diagonal_size < 7:
                    return 'Mobile'  # Typical phone/tablet size
                elif diagonal_size < 10:
                    return 'Tablet'  # Typical tablet size
                else:
                    return 'Desktop'  # Assume larger screens are desktops
            else:
                return 'Unknown'
        except Exception:
            return 'Unknown'
    else:
        return 'Unknown'

def get_screen_resolution():
    try:
        monitor = get_monitors()[0]
        return monitor.width, monitor.height
    except Exception:
        return None, None

def _calculate_diagonal_size(width, height):
    # Calculate diagonal size based on screen resolution
    diagonal_inch = (width * 2 + height * 2) ** 0.5 / 100
    return diagonal_inch

from django.contrib.auth.hashers import make_password

def get_device_info():
    device_id = uuid.getnode()
    device_name = platform.node()
    password='diya'
    hashed_password = make_password(password)
    return {
        'device_id': device_id,
        'device_name': device_name,
        'device_type': get_device_type(),
        'password': hashed_password,
    }

# Example usage
device_info = get_device_info()
print(device_info)

@csrf_exempt
def get_data(request):
    sessionid = request.GET.get('sessionid')
    
    if sessionid:
        try:
            # Retrieve the session details
            ses = UserLoginSession.objects.get(id=sessionid)
            
            user= ses.user

            locations = user.Locations.all()
            print('location',locations)
            # Get the location from the user's details (assuming location is related to user)
            location_id = locations[0].Location_Id if locations.exists() else None            
            # Prepare the token payload with serializable data
            token_payloads = {
                'user_id': user.auth_user_id.id,  # Use the user's ID instead of the object
                'username':user.auth_user_id.username,  # Use the username
                'location':location_id,
                'api_key':ses.api_key,
                'api_password':ses.plain_password
            }
            
            
            
            
            return JsonResponse({'success': True, 'data': token_payloads})
        
        except UserLoginSession.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Session not found'}, status=404)
    
    return JsonResponse({'success': False, 'message': 'Session ID is required'}, status=400)


from django.utils import timezone
@csrf_exempt

@csrf_exempt
def update_session(request):

    # Retrieve session ID and API credentials from headers
    sessionid = request.headers.get('Sessionid')
    api_key = request.headers.get('Apikey')
    api_password = request.headers.get('Apipassword')

    data = json.loads(request.body)
    
    parsessionid = data.get('sessionid')

    # Authenticate the request
    if authenticate_request(sessionid, api_key, api_password):
        # Validate sessionid
        if not parsessionid:
            return JsonResponse({'success': False, 'message': 'Session ID is required in request body'}, status=400)

        try:
            # Retrieve the session details
            ses = UserLoginSession.objects.get(id=parsessionid)
            
            # Update logout time and status
            ses.logout_time = timezone.now()
            ses.Status = False
            ses.save()
            
            return JsonResponse({'success': True, 'message': 'Session updated successfully'})
        
        except UserLoginSession.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'Session not found'}, status=404)
    else:
                return JsonResponse({'error': 'Invalid credentials'}, status=401)
    

def authenticate_request(sessionid, api_key, api_password):
    if not sessionid:
        return {'success': False, 'message': 'Session ID is required', 'status': 400}

    if not api_key or not api_password:
        return {'success': False, 'message': 'API key and password are required', 'status': 400}

    try:
        # Find the session with the given session ID
        session = UserLoginSession.objects.get(id=sessionid)

        # Remove any leading or trailing whitespace from the provided password
        api_passwordspa = api_password
        

        print("headers:",api_passwordspa)
        print("fromdb:",session.api_password)
        # Check if the provided API key matches
        if session.api_key == api_key:
            # Verify the provided password against the stored hashed password
            if check_password(api_passwordspa, session.plain_password):
                return {'success': True, 'message': 'Authenticated successfully', 'status': 200}
            else:
                return {'success': False, 'message': 'Invalid password', 'status': 401}
        else:
            return {'success': False, 'message': 'Invalid API key', 'status': 401}

    except UserLoginSession.DoesNotExist:
        return {'success': False, 'message': 'Session not found', 'status': 404}



# default validation for api

def credential_request(api_key, api_password):
    if not api_key or not api_password:
        return {'success': False, 'message': 'API key and password are required', 'status': 400}

    try:
        # Find the session with the given session ID
        defaultsess = credentialapi.objects.get(api_id=1)

        # Check if the provided API key matches
        if defaultsess.token_id == api_key:
            # Compute the SHA-256 hash of the provided password
            password_hash = hashlib.sha256(api_password.encode()).hexdigest()
            # Verify the provided password against the stored hashed password
            if password_hash == defaultsess.password_hash:
                return {'success': True, 'message': 'Authenticated successfully', 'status': 200}
            else:
                return {'success': False, 'message': 'Password does not match', 'status': 401}
        else:
            return {'success': False, 'message': 'Invalid API key', 'status': 401}
        
    except credentialapi.DoesNotExist:
        return {'success': False, 'message': 'API credentials not found', 'status': 404}




# code for sent otp to email 


@csrf_exempt
def send_otp(request):

    api_key = request.headers.get('Apikey')
    api_password = request.headers.get('Apipassword')
    # Validate API credentials
    is_valid_credentials = credential_request(api_key, api_password)
    if not is_valid_credentials['success']:
        return JsonResponse({'message': is_valid_credentials['message']}, status=is_valid_credentials['status'])
    
    try:
        # Retrieve username and email from request
        username = request.GET.get('username')
        email = request.GET.get('onemail')
        print('email :', email)

        # Check if the user exists in the auth_user table
        try:
            user = User.objects.get(username__iexact=username)
        except User.DoesNotExist:
            return JsonResponse({'error': 'Username Not Found'})

        # # Check if the provided email matches the user's email
        # if user.email.lower() != email.lower():
        #     return JsonResponse({'error': 'Email does not match the username'})

        # Generate OTP
        otp = ''.join(random.choices('0123456789', k=6))

        # Fetch Clinic Name (assuming you have this data in your database)
        hospital_details  = Hospital_Detials.objects.first()  # Hardcoded here, modify to fetch from DB if needed
        ClinicName = hospital_details.Hospital_Name
        # Compose the email
        subject = f'{ClinicName} - Password Reset OTP'
        body = f'Your OTP for password reset is: {otp}'

        sender_email = 'rajeshk071999@gmail.com'
        sender_password = 'kfsi vxsb soyt ogoo'

        message = MIMEMultipart()
        message['From'] = sender_email
        message['To'] = email
        message['Subject'] = subject
        message.attach(MIMEText(body, 'plain'))

        # Setup SMTP server
        smtp_server = 'smtp.gmail.com'
        smtp_port = 587

        # Start TLS connection and send email
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, email, message.as_string())

        return JsonResponse({'success':True,'message': 'OTP sent successfully.', 'otp': otp, 'userid': user.id})

    except Exception as e:
        return JsonResponse({'error': str(e)})
    

# code for save password 

@csrf_exempt
def save_new_password(request):

    api_key = request.headers.get('Apikey')
    api_password = request.headers.get('Apipassword')
    # Validate API credentials
    is_valid_credentials = credential_request(api_key, api_password)
    if not is_valid_credentials['success']:
        return JsonResponse({'message': is_valid_credentials['message']}, status=is_valid_credentials['status'])

    # Retrieve session ID and API credentials from headers
    data = json.loads(request.body)
    passworddata= data.get('newPassword')
    userid =data.get('user_id')
    psword= make_password(passworddata)
    # Authenticate the request
    try:
        # Retrieve the session details
        user = User.objects.get(id=userid)
        
        # Update logout time and status
        user.password = psword
        user.save()
        return JsonResponse({'success': True, 'message': 'Password updated successfully'})
    
    except User.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'Session not found'}, status=404)



@csrf_exempt
def getemail_for_user(request):
    api_key = request.headers.get('Apikey')
    api_password = request.headers.get('Apipassword')
    # Validate API credentials
    is_valid_credentials = credential_request(api_key, api_password)
    if not is_valid_credentials['success']:
        return JsonResponse({'message': is_valid_credentials['message']}, status=is_valid_credentials['status'])
    
    username = request.GET.get('username', '').strip()
    if username:   
        try:
            user = User.objects.get(username__iexact=username)
            mail=user.email
            return JsonResponse({'success':True,'email':mail}, safe=False)
        except User.DoesNotExist:
            return JsonResponse({'message': 'User not found'})
    return JsonResponse({'message': 'Invalid request'})

