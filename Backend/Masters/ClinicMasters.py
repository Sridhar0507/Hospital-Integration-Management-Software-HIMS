import json
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Hospital_Detials,Clinic_Detials,Location_Detials
from PIL import Image
from io import BytesIO
import base64
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ValidationError


@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def Hospital_Detials_link(request):
    if request.method == 'POST':
        try:
            data = request.POST
            hospital_name = data.get('hospitalName')
            hospital_logo = request.FILES.get('hospitalLogo')
            created_by = data.get('created_by')
            hospital_id = data.get('hospitalId')

            compressed_image_data = None
            if hospital_logo:
                hospital_image = Image.open(hospital_logo)
                if hospital_image.mode in ('RGBA', 'P'):
                    hospital_image = hospital_image.convert('RGB')
                output = BytesIO()
                quality = 95
                while True:
                    output.seek(0)
                    hospital_image.save(output, format='JPEG', quality=quality)
                    size = output.tell()
                    if size <= 200 * 1024:  # 200KB
                        break
                    quality -= 5  # Reduce quality step by step
                    if quality < 10:  # Do not go below this quality threshold
                        break
                output.seek(0)
                compressed_image_data = output.read()

            if hospital_id != '':
                try:
                    hospital_details_instance = Hospital_Detials.objects.get(pk=hospital_id)
                    hospital_details_instance.Hospital_Name = hospital_name
                    if compressed_image_data:
                        hospital_details_instance.Hospital_Logo = compressed_image_data
                    hospital_details_instance.created_by = created_by
                    hospital_details_instance.clean()  # Validate the instance
                    hospital_details_instance.save()
                    return JsonResponse({'message': 'Data updated successfully'})
                except Hospital_Detials.DoesNotExist:
                    return JsonResponse(None, safe=False)
                except ValidationError as ve:
                    print(ve)
                    return JsonResponse( ve.message_dict, status=400)
            else:
                hospital_details_instance = Hospital_Detials(
                    Hospital_Name=hospital_name,
                    Hospital_Logo=compressed_image_data,
                    created_by=created_by,
                )
                try:
                    hospital_details_instance.clean()  # Validate the instance
                    hospital_details_instance.save()
                    return JsonResponse({'message': 'Data inserted successfully'})
                except ValidationError as ve:
                    print(ve)
                    return JsonResponse(ve.message_dict, status=400)

        except ValidationError as ve:
            return JsonResponse(ve.message_dict, status=400)
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)

    elif request.method == 'GET':
        try:
            if Hospital_Detials.objects.exists():
                hospital = Hospital_Detials.objects.first()  # You can change the logic to get the desired record
                hospital_dict = {
                    'HospitalId': hospital.Hospital_Id,
                    'hospitalName': hospital.Hospital_Name,
                    'hospitalLogo': base64.b64encode(hospital.Hospital_Logo).decode('utf-8') if hospital.Hospital_Logo else None,
                    'created_by': hospital.created_by,
                }
                return JsonResponse(hospital_dict)
            else:
                return JsonResponse(None, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
        



@csrf_exempt   
@require_http_methods(["POST", "OPTIONS", "GET"])
def Clinic_Detials_link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
       
            # Extract and validate data
            Clinic_Id = data.get('ClinicId')
            Clinic_mail = data.get('Mail')
            Clinic_phone_no = data.get('PhoneNo')
            Clinic_landline_no = data.get('LandlineNo')
            Clinic_gst_no = data.get('GSTNo')
            Clinic_door_no = data.get('DoorNo')
            Clinic_street = data.get('Street')
            Clinic_area = data.get('Area')
            Clinic_city = data.get('City')
            Clinic_state = data.get('State')
            Clinic_country = data.get('Country')
            Clinic_pincode = data.get('Pincode')
            created_by = data.get('created_by')
            location = data.get('Location')

            if location:
                loc_instance = Location_Detials.objects.get(pk = location)
            if Clinic_Id:
               
                try:
                    
                    if Clinic_Detials.objects.filter(Location = loc_instance ).exclude(pk =Clinic_Id):

                        return JsonResponse({'warn': f"The Hospital Detials are already present in the location {loc_instance.Location_Name}"})
                    else:
                        Clinic_Detials_instance = Clinic_Detials.objects.get(pk=Clinic_Id)
                        Clinic_Detials_instance.Clinic_Mail = Clinic_mail
                        Clinic_Detials_instance.Clinic_PhoneNo = Clinic_phone_no
                        Clinic_Detials_instance.Clinic_LandlineNo = Clinic_landline_no
                        Clinic_Detials_instance.Clinic_GstNo = Clinic_gst_no
                        Clinic_Detials_instance.Clinic_DoorNo = Clinic_door_no
                        Clinic_Detials_instance.Clinic_Street = Clinic_street
                        Clinic_Detials_instance.Clinic_Area = Clinic_area
                        Clinic_Detials_instance.Clinic_City = Clinic_city
                        Clinic_Detials_instance.Clinic_State = Clinic_state
                        Clinic_Detials_instance.Clinic_Country = Clinic_country
                        Clinic_Detials_instance.Clinic_Pincode = Clinic_pincode
                        Clinic_Detials_instance.created_by = created_by
                        Clinic_Detials_instance.Location = loc_instance
                        Clinic_Detials_instance.save()
                        
                        return JsonResponse({'success': 'Hospital Data Updated successfully'})
                except Clinic_Detials.DoesNotExist:
                    return JsonResponse(None,safe=False)
            else:  
             
                
                
                if Clinic_Detials.objects.filter(Location = loc_instance ).exists():

                    return JsonResponse({'warn': f"The Hospital Detials are already present in the location {loc_instance.Location_Name}"})
                else:
                    Clinic_details_instance = Clinic_Detials(
                        Clinic_Mail=Clinic_mail,
                        Clinic_PhoneNo=Clinic_phone_no,
                        Clinic_LandlineNo=Clinic_landline_no,
                        Clinic_GstNo=Clinic_gst_no,
                        Clinic_DoorNo=Clinic_door_no,
                        Clinic_Street=Clinic_street,
                        Clinic_Area=Clinic_area,
                        Clinic_City=Clinic_city,
                        Clinic_State=Clinic_state,
                        Clinic_Country=Clinic_country,
                        Clinic_Pincode=Clinic_pincode,
                        created_by=created_by,
                        Location=loc_instance
                    )
                    Clinic_details_instance.save()
                    return JsonResponse({'success': 'Hospital Data added successfully'})
                

                    
        
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
        
    elif request.method == 'GET':
        try:
            # Fetch all records from the Clinic_Detials model
            Clinics = Clinic_Detials.objects.all()
            
            # Construct a list of dictionaries containing Clinic data
            Clinic_data = []
            for Clinic in Clinics:
            
                Clinic_dict = {
                   
                    'id': Clinic.Clinic_Id,
                    'location': Clinic.Location.Location_Id,
                    'locationName': Clinic.Location.Location_Name,
                    'created_by': Clinic.created_by,
                    'Mail': Clinic.Clinic_Mail,
                    'PhoneNo': Clinic.Clinic_PhoneNo,
                    'LandlineNo': Clinic.Clinic_LandlineNo,
                    'GSTNo': Clinic.Clinic_GstNo,
                    'DoorNo': Clinic.Clinic_DoorNo,
                    'Street': Clinic.Clinic_Street,
                    'Area': Clinic.Clinic_Area,
                    'City': Clinic.Clinic_City,
                    'State': Clinic.Clinic_State,
                    'Country': Clinic.Clinic_Country,
                    'Pincode': Clinic.Clinic_Pincode,
                }
                
                Clinic_data.append(Clinic_dict)
               

            return JsonResponse(Clinic_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
        
        

@csrf_exempt
def get_clinic_detials_by_loc_id (request):
    try:
        location = request.GET.get('location',None)
        if location:
            if Clinic_Detials.objects.exists():
                Clinic = Clinic_Detials.objects.get(Location__pk = location)
                Clinic_dict = {
                        
                            'id': Clinic.Clinic_Id,
                            'Mail': Clinic.Clinic_Mail,
                            'PhoneNo': Clinic.Clinic_PhoneNo,
                            'LandlineNo': Clinic.Clinic_LandlineNo,
                            'GSTNo': Clinic.Clinic_GstNo,
                            'DoorNo': Clinic.Clinic_DoorNo,
                            'Street': Clinic.Clinic_Street,
                            'Area': Clinic.Clinic_Area,
                            'City': Clinic.Clinic_City,
                            'State': Clinic.Clinic_State,
                            'Country': Clinic.Clinic_Country,
                            'Pincode': Clinic.Clinic_Pincode,
                        }
                return JsonResponse(Clinic_dict)
            return JsonResponse({})

    except Exception as e:
        print(f'error: {str(e)}')
        return JsonResponse({'error': 'An internal server error occurred'}, status=500)

        
    