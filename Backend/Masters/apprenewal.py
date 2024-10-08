from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import appexpiry
import json
from .Login import authenticate_request

@csrf_exempt
def subscribeapp(request):
    api_key = request.headers.get('Apikey')
    api_password = request.headers.get('Apipassword')
    sessionid = request.headers.get('Sessionid')
    if authenticate_request(sessionid, api_key, api_password):
        if request.method == 'POST':
            data1= request.headers.get

            print(data1)
            # Validate API credentials
            
            try:
                # Parse JSON request body
                data = json.loads(request.body)
                subscriptionType = data.get('subscriptionType', '')
                duration = data.get('duration', '')
                startDate = data.get('startDate', '')
                endDate = data.get('endDate', '')
                status = data.get('status', '')

                # Save subscription data
                app = appexpiry.objects.create(
                    subscriptiontype=subscriptionType,
                    duration=duration,
                    appstart_date=startDate,
                    app_end_date=endDate,
                    status=status
                )
                app.save()

                return JsonResponse({'success': True, 'message': 'Saved successfully'})

            except json.JSONDecodeError:
                return JsonResponse({'success': False, 'message': 'Invalid JSON'}, status=400)

            except Exception as e:
                return JsonResponse({'success': False, 'message': str(e)}, status=500)

        elif request.method == 'GET':
            try:
                # Fetch all data from the appexpiry table without any filters
                subscriptions = appexpiry.objects.all()

                # Serialize data to JSON
                result = []
                for app in subscriptions:
                    result.append({
                        'seraialno':app.s_no,
                        'subscriptionType': app.subscriptiontype,
                        'duration': app.duration,
                        'startDate': app.appstart_date,
                        'endDate': app.app_end_date,
                        'status': app.status
                    })

                return JsonResponse({'success': True, 'data': result}, status=200)

            except Exception as e:
                print(str(e))
                return JsonResponse({'success': False, 'message': str(e)}, status=500)

        return JsonResponse({'success': False, 'message': 'Invalid request method'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid credentials'}, status=200)
    


@csrf_exempt
def marquerun(request):
    api_key = request.headers.get('Apikey')
    api_password = request.headers.get('Apipassword')
    sessionid = request.headers.get('Sessionid')
    if authenticate_request(sessionid, api_key, api_password):       
        if request.method == 'GET':
            try:
                # Fetch all data from the appexpiry table without any filters
                subscriptions = appexpiry.objects.filter(status='active')

                # Serialize data to JSON
                result = []
                for app in subscriptions:
                    result.append({
                        'seraialno':app.s_no,
                        'subscriptionType': app.subscriptiontype,
                        'duration': app.duration,
                        'startDate': app.appstart_date,
                        'endDate': app.app_end_date,
                        'status': app.status
                    })

                return JsonResponse({'success': True, 'data': result}, status=200)

            except Exception as e:
                print(str(e))
                return JsonResponse({'success': False, 'message': str(e)}, status=500)

        return JsonResponse({'success': False, 'message': 'Invalid request method'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid credentials'}, status=200)