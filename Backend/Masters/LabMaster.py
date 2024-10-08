import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import LabTestName_Details
from django.db.models import Max
from django.db.models import Q

from .models import *



@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def External_LabDetails_Link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
        
            
            LabName = data.get("LabName", '')
            RegisterNo = data.get("RegisterNo", '')
            Address = data.get("Address", '')
            PhoneNo = data.get("PhoneNo", '')
            Email = data.get("Email", '')
            Pincode = data.get("Pincode", '')
            created_by = data.get("created_by", "")
            LabLocation = data.get("location", '')
            Location = data.get("locations", '')
            Status = data.get('Status')
            print(Status)
            ExternalId = data.get('ExternalId', None)

            if Location:
                location_ins = Location_Detials.objects.get(Location_Id=Location)

            if ExternalId:

                External_Lab_instance = External_LabDetails.objects.get(External_Id=ExternalId)
                External_Lab_instance.LabName = LabName
                External_Lab_instance.PhoneNo = PhoneNo
                External_Lab_instance.Address = Address
                External_Lab_instance.Pincode = Pincode
                External_Lab_instance.RegisterNo = RegisterNo
                External_Lab_instance.Email = Email
                External_Lab_instance.Lablocation = LabLocation
                External_Lab_instance.location = location_ins
                External_Lab_instance.created_by = created_by
                External_Lab_instance.Status = Status
                External_Lab_instance.save()
                return JsonResponse({'success': 'LabName Updated Successfully'})
            else:
                if External_LabDetails.objects.filter(LabName=LabName).exists():
                    return JsonResponse({'warn': f"The LabDetails is already present in the name of {LabName}"})
                else:
                    External_Lab_instance = External_LabDetails.objects.create(
                        LabName=LabName,
                        PhoneNo=PhoneNo,
                        Address=Address,
                        Pincode=Pincode,
                        RegisterNo=RegisterNo,
                        Email=Email,
                        Lablocation=LabLocation,
                        location=location_ins,
                        created_by=created_by,
                        Status=Status
                    )

                return JsonResponse({'success': 'Lab Details Added successfully'})

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    elif request.method == 'GET':
        try:
            External_Address = External_LabDetails.objects.all()
            Exterbal_Datas = [
                {
                    'id':add.External_Id,
                    'LabName':add.LabName,
                    'PhoneNo':add.PhoneNo,
                    'Address':add.Address,
                    'Pincode':add.Pincode,
                    'RegisterNo':add.RegisterNo,
                    'Email':add.Email,
                    'Lablocation':add.Lablocation,
                    'created_by':add.created_by,
                    'Status':add.Status,
                    'location':add.location.Location_Id,
                    
                } for add in External_Address
            ]
            return JsonResponse(Exterbal_Datas, safe=False)
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error':'An internal server error occurred'}, status=500)

        
@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def Active_LabDetails_Link(request):
    if request.method == 'GET':
        try:
            External_Address = External_LabDetails.objects.filter(Status="Active")
            Exterbal_Datas = [
                {
                    'id':add.External_Id,
                    'LabName':add.LabName,                 
                } for add in External_Address
            ]
            return JsonResponse(Exterbal_Datas, safe=False)
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error':'An internal server error occurred'}, status=500)



    
from .models import LabTestName_Details, External_LabDetails




@csrf_exempt
@require_http_methods(["POST", "GET", "OPTIONS"])
def Lab_Test_Name_link(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print("Received data:", data)

            TestCode = data.get('TestCode', '')
            TestName = data.get('TestName', '')
            Amount = float(data.get('Amount', 0)) if data.get('Amount') else 0
            created_by = data.get('created_by', '')
            Location = data.get('location', None)
            Status = data.get('Status', 'Active')
            Types = data.get('Types')
            LabName_list = data.get('LabDetails', [])
            SubTestName_list = data.get('Sub_test_data', [])
            

            if not TestName:
                return JsonResponse({'error': 'Test Name is required'}, status=400)

            if not Location:
                return JsonResponse({'error': 'Location is required'}, status=400)

            try:
                location_ins = Location_Detials.objects.get(Location_Id=Location)
            except Location_Detials.DoesNotExist:
                return JsonResponse({'error': 'Location not found'}, status=404)

            if TestCode:
                try:
                    lab_ins = LabTestName_Details.objects.get(TestCode=TestCode)

                    lab_ins.Test_Name = TestName
                    lab_ins.Prev_Amount = lab_ins.Amount
                    lab_ins.Amount = Amount
                    lab_ins.Types = Types
                    lab_ins.Status = Status
                    lab_ins.save()

                    # Handling SubTest updates if necessary
                    if LabName_list and Types == 'Yes':
                        for res in LabName_list:
                            print("res",res)
                            OutsourceId = res.get('OutSourceId', '')
                            LabName = res.get('LabName', '')
                            LabAmount = res.get('LabAmount', 0)
                            print("LabAmount",LabAmount)
                            Amount_f = float(LabAmount) if LabAmount else 0
                            Statusss = res.get("Status")

                            try:
                                LabName_ins = External_LabDetails.objects.get(LabName=LabName)
                            except External_LabDetails.DoesNotExist:
                                return JsonResponse({'error': f'External Lab {LabName} not found'})

                            if OutsourceId:
                                try:
                                    sub_ins = External_LabAmount_Details.objects.get(OutSource_Id=OutsourceId)
                                    sub_ins.Test_Name = lab_ins
                                    sub_ins.OutSourceLabName = LabName_ins
                                    sub_ins.OutSourcePrev_Amount = sub_ins.OutSourceLabAmount
                                    sub_ins.OutSourceLabAmount = Amount_f
                                    sub_ins.Status = Statusss
                                    sub_ins.save()
                                except External_LabAmount_Details.DoesNotExist:
                                    return JsonResponse({'error': 'Outsource Id not found'}, status=404)
                            else:
                                External_LabAmount_Details.objects.create(
                                    Test_Name=lab_ins,
                                    OutSourceLabName=LabName_ins,
                                    OutSourceLabAmount=Amount_f,
                                    created_by=created_by,
                                    Status='Active'
                                )
                    
                    return JsonResponse({'success': 'Test updated successfully'}, status=200)

                except LabTestName_Details.DoesNotExist:
                    return JsonResponse({'error': 'Test Code not found'}, status=404)
            else:
                # Creating a new Test
                lab_ins = LabTestName_Details.objects.create(
                    Test_Name=TestName,
                    Prev_Amount=0,
                    Amount=Amount,
                    Types=Types,
                    created_by=created_by,
                    location=location_ins,
                    Status=Status
                )

                if LabName_list and Types == 'Yes':
                    for res in LabName_list:
                        LabName = res.get('LabName')
                        LabAmount = res.get('LabAmount', 0)
                        LabPrevAmount = res.get('LabPrev_Amount', 0)
                        Amount_d = float(LabPrevAmount) if LabPrevAmount else 0
                        Amount_f = float(LabAmount) if LabAmount else 0
                        Status = res.get("Status", "Active")

                        try:
                            LabName_ins = External_LabDetails.objects.get(LabName=LabName)
                        except External_LabDetails.DoesNotExist:
                            return JsonResponse({'error': f'External Lab {LabName} not found'})

                        External_LabAmount_Details.objects.create(
                            Test_Name=lab_ins,
                            OutSourceLabName=LabName_ins,
                            OutSourcePrev_Amount=Amount_d,
                            OutSourceLabAmount=Amount_f,
                            created_by=created_by,
                            Status=Status
                        )

                return JsonResponse({'success': 'Test created successfully'}, status=201)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': f'Internal server error: {str(e)}'}, status=500)

    elif request.method == 'GET':
        try:
            TestNames = LabTestName_Details.objects.all()
            TestName_data = []

            for idss, TestName in enumerate(TestNames, start=1):
                TestName_dict = {
                    'id': idss,
                    'TestCode': TestName.TestCode,
                    'Test_Name': TestName.Test_Name,
                    'Prev_Amount': TestName.Prev_Amount,
                    'Amount': TestName.Amount,
                    'Status': TestName.Status,
                    'created_by': TestName.created_by,
                    'location': TestName.location.Location_Id,
                    'Types': TestName.Types,
                    'Sub_test_data': []
                }

                if TestName.Types == 'Yes':
                    LabNames = External_LabAmount_Details.objects.filter(Test_Name=TestName)
                    for sids, res in enumerate(LabNames, start=1):
                        ggg = {
                            'id': sids,
                            'OutSourceId': res.OutSource_Id,
                            'LabName': res.OutSourceLabName.LabName,
                            'LabAmount': res.OutSourceLabAmount,
                            'LabPrev_Amount': res.OutSourcePrev_Amount,
                            'Status': res.Status
                        }
                        TestName_dict['Sub_test_data'].append(ggg)

                TestName_data.append(TestName_dict)

            return JsonResponse(TestName_data, safe=False)
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': f'An internal server error occurred: {str(e)}'}, status=500)

    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    

@csrf_exempt
@require_http_methods(["GET"])
def Test_Names_link(request):
    try:
        TestName = request.GET.get("Testgo", None) 
        print("TestName",TestName)# Get the TestName from the query parameters
        if TestName:
            
            TestNames = LabTestName_Details.objects.filter(Status="Active", Test_Name__startswith=TestName)[:10]
            print('TestNames :',TestNames)
        else:
            TestNames = LabTestName_Details.objects.filter(Status="Active")[:10]
        
        testname_data = [
            {
                'id': TestName.TestCode,
                'Test_Name': TestName.Test_Name,
                'Amount': TestName.Amount,
            } for TestName in TestNames
        ]
        
        return JsonResponse(testname_data, safe=False)
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return JsonResponse({'error': 'An internal server error occurred'}, status=500)

from .models import TestName_Favourites, LabTestName_Details



@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def Favourite_TestNames_Details(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            Favourite_Name = data.get('FavouritesName')
            Favourite_Code = data.get('FavouritesCode')
            Test_Names = data.get('FavouriteNamess', [])
            SumOf_Amount = data.get('SumOfAmount')
            Previous_Amount = data.get('Previous_Amount', 0)
            Current_Amount = data.get('Amount', 0)
            created_by = data.get('created_by', '')
            Status = data.get('Status', 'Active')
            
            if Favourite_Code:
                try:
                    Favourite_instance = TestName_Favourites.objects.get(Favourite_Code=Favourite_Code)
                except TestName_Favourites.DoesNotExist:
                    return JsonResponse({'error': 'Favourite with provided code does not exist'}, status=400)
                
                Favourite_instance.Previous_Amount = Favourite_instance.Current_Amount
                Favourite_instance.Current_Amount = float(Current_Amount)
                Favourite_instance.FavouriteName = Favourite_Name
                Favourite_instance.SumOfAmount = SumOf_Amount
                Favourite_instance.created_by = created_by
                Favourite_instance.Status = Status
                Favourite_instance.save()

                Favourite_instance.TestName.clear()
                for test in Test_Names:
                    try:
                        TestName_instance = LabTestName_Details.objects.get(TestCode=test['TestCode'])
                        Favourite_instance.TestName.add(TestName_instance)
                    except LabTestName_Details.DoesNotExist:
                        return JsonResponse({'error': f'TestName with TestCode {test["TestCode"]} does not exist'}, status=400)

                return JsonResponse({'success': 'Favourite Test Names updated successfully'})
            else:
                if not (Favourite_Name and Test_Names and SumOf_Amount is not None):
                    return JsonResponse({'error': 'Missing required fields'}, status=400)

                Favourite_instance = TestName_Favourites(
                    FavouriteName=Favourite_Name,
                    SumOfAmount=SumOf_Amount,
                    Previous_Amount=Previous_Amount,
                    Current_Amount=float(Current_Amount),
                    created_by=created_by,
                    Status=Status
                )
                Favourite_instance.save()

                for test in Test_Names:
                    try:
                        TestName_instance = LabTestName_Details.objects.get(TestCode=test['TestCode'])
                        Favourite_instance.TestName.add(TestName_instance)
                    except LabTestName_Details.DoesNotExist:
                        return JsonResponse({'error': f'TestName with TestCode {test["TestCode"]} does not exist'}, status=400)

                return JsonResponse({'success': 'Favourite Test Names added successfully'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    elif request.method == 'GET':
        try:
            FavNames = TestName_Favourites.objects.all()
            Register_data = [
                {
                    'id': fav.Favourite_Code,
                    'FavouriteName': fav.FavouriteName,
                    'TestName': [{'TestCode': test.TestCode, 'TestName': test.Test_Name} for test in fav.TestName.all()],
                    'SumOfAmount': fav.SumOfAmount,
                    'Previous_Amount': fav.Previous_Amount,
                    'Current_Amount': fav.Current_Amount,
                    'created_by': fav.created_by,
                    'Status': fav.Status,
                } for fav in FavNames
            ]
            return JsonResponse(Register_data, safe=False)
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    return JsonResponse({'error': 'Method not allowed'}, status=405)


@csrf_exempt
@require_http_methods(["GET"])
def Favourites_Names_link(request):
    if request.method == 'GET':
        try:
            FavNames = TestName_Favourites.objects.filter(Status="Active")
            favourite_data = [
                {
                    'id': fav.Favourite_Code,
                    'FavouriteName': fav.FavouriteName,
                    'TestName': [{'TestCode': test.TestCode, 'TestName': test.Test_Name} for test in fav.TestName.all()],
                    'Current_Amount': fav.Current_Amount,
                } for fav in FavNames
            ]
            return JsonResponse(favourite_data, safe=False)
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
        

    if request.method == 'GET':
        try:
            # Get the first 10 active test names
            TestNames = LabTestName_Details.objects.filter(Status="Active")[:10]
            testname_data = [
                {
                    'id': TestName.TestCode,
                    'Test_Name': TestName.Test_Name,
                    'Amount': TestName.Amount,
                } for TestName in TestNames
            ]
            return JsonResponse(testname_data, safe=False)
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
        
    
@csrf_exempt
@require_http_methods(["GET"])
def Test_Names_link_LabTest(request):
    try:

       
        TestNames = LabTestName_Details.objects.filter(Status="Active")
        
        testname_data = [
            {
                'id': TestName.TestCode,
                'Test_Name': TestName.Test_Name,
                'Amount': TestName.Amount,
            } for TestName in TestNames
        ]
        
        return JsonResponse(testname_data, safe=False)
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return JsonResponse({'error': 'An internal server error occurred'}, status=500)