import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import *
from django.db.models import Sum, Max, Q

import random
import string
from django.db import transaction
from decimal import Decimal
from .Login import authenticate_request
from docx import Document
import base64
import magic  # Make sure you have the python-magic library installed
#--------------------------------------------Radiology insert,get,update----------------------------------------







@csrf_exempt
@require_http_methods(["POST", "GET", "OPTIONS"])
def Radiology_Names_link(request):
    api_key = request.headers.get('Apikey')
    api_password = request.headers.get('Apipassword')
    sessionid = request.headers.get('Sessionid')
    if authenticate_request(sessionid, api_key, api_password):
        if request.method == 'POST':
            try:
                data = json.loads(request.body)
                print("Received data:", data)

                RadiologyId = data.get('RadiologyId', '')
                RadiologyName = data.get('RadiologyName', '').strip().upper()
                created_by = data.get('created_by', '')
                Location = data.get('Location', '')
                Statusedit = data.get('Statusedit', False)

                if RadiologyId:
                    try:
                        Radiology_instance = RadiologyNames_Details.objects.get(pk=RadiologyId)
                    except RadiologyNames_Details.DoesNotExist:
                        return JsonResponse({'warn': 'Radiology ID not found'})
                    if RadiologyNames_Details.objects.filter(Radiology_Name=RadiologyName).exists():
                        return JsonResponse({'warn': f"The RadiologyName '{RadiologyName}' is already present "})

                    if Statusedit:
                        Radiology_instance.Status = not Radiology_instance.Status
                    else:
                        Radiology_instance.Radiology_Name = RadiologyName
                    Radiology_instance.save()

                    # Clear existing BookingFees_Details for this Radiology instance
                  
                    return JsonResponse({'success': 'RadiologyName updated successfully'})
                else:
                    if not Location:
                        return JsonResponse({'warn': 'Location is required'})

                    try:
                        Location_instance = Location_Detials.objects.get(Location_Id=Location)
                    except Location_Detials.DoesNotExist:
                        return JsonResponse({'warn': 'Invalid location'})

                    if RadiologyNames_Details.objects.filter(Radiology_Name=RadiologyName, Location_Name=Location_instance).exists():
                        return JsonResponse({'warn': f"The RadiologyName '{RadiologyName}' is already present "})

                    Radiology_instance = RadiologyNames_Details(
                        Radiology_Name=RadiologyName,
                        Location_Name=Location_instance,
                        created_by=created_by,
                    )
                    Radiology_instance.save()

                    return JsonResponse({'success': 'RadiologyName added successfully'})

            except Exception as e:
                print(f"An error occurred: {str(e)}")
                return JsonResponse({'error': 'An internal server error occurred'}, status=500)

        elif request.method == 'GET':
            try:
                Radiology_Master = RadiologyNames_Details.objects.all()
                Radiology_Master_data = []
                for Radiology in Radiology_Master:


                    Radiology_Master_data.append({
                        'id': Radiology.Radiology_Id,
                        'RadiologyName': Radiology.Radiology_Name,
                        'created_by': Radiology.created_by,
                        'Location_Name': Radiology.Location_Name.Location_Name if Radiology.Location_Name else 'Unknown',
                        'Location_Id': Radiology.Location_Name.pk if Radiology.Location_Name else 'Unknown',
                        'Status': 'Active' if Radiology.Status else 'Inactive',
                    })

                return JsonResponse(Radiology_Master_data, safe=False)
            except Exception as e:
                print(f"An error occurred: {str(e)}")
                return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    else:
        return JsonResponse({'error': 'Invalid credentials'}, status=200)
        

   
#------------------Sub_TestName------------------------
      
        
@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def Radiology_details_link(request):
    api_key = request.headers.get('Apikey')
    api_password = request.headers.get('Apipassword')
    sessionid = request.headers.get('Sessionid')
    if authenticate_request(sessionid, api_key, api_password):
        def validate_and_process_file(file):
          
            def get_file_type(file):
                if file.startswith('data:application/pdf;base64'):
                    return 'application/pdf'
                elif file.startswith('data:image/jpeg;base64') or file.startswith('data:image/jpg;base64'):
                    return 'image/jpeg'
                elif file.startswith('data:image/png;base64'):
                    return 'image/png'
                elif file.startswith('data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64'):
                    return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'  # .docx
                elif file.startswith('data:application/msword;base64'):
                    return 'application/msword'  # .doc
                else:
                    return 'unknown'

            def compress_image(image, min_quality=10, step=5):
                output = BytesIO()
                quality = 95
                while quality >= min_quality:
                    output.seek(0)
                    image.save(output, format='JPEG', quality=quality)
                    compressed_data = output.getvalue()
                    quality -= step
                return compressed_data, len(compressed_data)

            def compress_pdf(file):
                output = BytesIO()
                reader = PdfReader(file)
                writer = PdfWriter()
                for page_num in range(len(reader.pages)):
                    writer.add_page(reader.pages[page_num])
                writer.write(output)
                return output.getvalue(), len(output.getvalue())

            def process_word_file(file):
                # Open the Word file and return some information (or process it as needed)
                document = Document(file)
                # For demonstration, we return the number of paragraphs as an example of processing
                num_paragraphs = len(document.paragraphs)
                return num_paragraphs

            if file:
                try:
                    file_data = file.split(',')[1]
                    file_content = base64.b64decode(file_data)
                    file_size = len(file_content)

                    max_size_mb = 5
                    if file_size > max_size_mb * 1024 * 1024:
                        return JsonResponse({'warn': f'File size exceeds the maximum allowed size ({max_size_mb}MB)'}, status=400)

                    file_type = get_file_type(file)

                    if file_type in ['image/jpeg', 'image/png']:
                        image = Image.open(BytesIO(file_content))
                        if image.mode in ('RGBA', 'P'):
                            image = image.convert('RGB')
                        compressed_image_data, _ = compress_image(image)
                        return compressed_image_data

                    elif file_type == 'application/pdf':
                        compressed_pdf_data, _ = compress_pdf(BytesIO(file_content))
                        return compressed_pdf_data

                    elif file_type in ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword']:
                        # Process Word files
                        word_content = process_word_file(BytesIO(file_content))
                        return JsonResponse({'word_content': word_content}, status=200)

                    else:
                        return JsonResponse({'warn': 'Unsupported file format'}, status=400)

                except Exception as e:
                    return JsonResponse({'error': f'Error processing file: {str(e)}'}, status=500)

            return None
        if request.method == 'POST':
            try:
                # data = json.loads(request.body)
                data = request.POST
                # print("TestName POST data123:", data)

                # Extract data from JSON payload
                TestNameId = data.get('TestNameId', '')
                TestCode = data.get('TestCode', '')
                RadiologyName = data.get('RadiologyName', '')
                TestName = data.get('TestName', '')
                ChooseFile = data.get('ChooseFile','')
                # print('Files',ChooseFile)
                Types = data.get('Types', '')
                Amount = data.get('Amount', '')
                Amount = float(Amount) if Amount else 0
                BookingFees = data.get('BookingFees', '')
                BookingFees = float(BookingFees) if BookingFees else 0
                Prev_Amount = data.get('Prev_Amount', '')
                Prev_Amount = float(Prev_Amount) if Prev_Amount else 0.0  # Handle empty or invalid values

                Prev_BookingFees = data.get('Prev_BookingFees', '')
                Prev_BookingFees = float(Prev_BookingFees) if Prev_BookingFees else 0.0  # Handle empty or invalid values

                created_by = data.get('created_by', '')
                Status = data.get('Status', '')
                SubTestName_list_str = data.get('SubTestName', '[]')  # Expecting a JSON string
                SubTestName_list = json.loads(SubTestName_list_str)  # Convert to Python list of dictionaries                RadiologyName = int(RadiologyName)
                rad_instance = RadiologyNames_Details.objects.get(Radiology_Id=RadiologyName)
                radiology_name = rad_instance.Radiology_Name
                
                processed_files = {
                    'ChooseFile': validate_and_process_file(ChooseFile) if ChooseFile else None,
                }
                if TestNameId:
                    if TestName_Details.objects.filter(Radiology_Id=rad_instance, Test_Name=TestName).exclude(Test_Code=TestCode).exists():
                        return JsonResponse({'warn': f"Same Test Name already exists for Radiology '{radiology_name}'"})
                else:
                    if TestName_Details.objects.filter(Radiology_Id=rad_instance, Test_Name=TestName).exists():
                        return JsonResponse({'warn': f"Same Test Name already exists for Radiology '{radiology_name}'"})

                if TestCode:
                    # Update existing TestName_Details instance
                    with transaction.atomic():
                        test_instance = TestName_Details.objects.get(Test_Code=TestCode)

                        test_instance.Radiology_Id = rad_instance
                        test_instance.Test_Name = TestName
                        test_instance.IsSub_Test = Types
                        test_instance.Prev_Amount = test_instance.Amount  # Assign the default value or fetched data
                        test_instance.Amount = Amount
                        test_instance.Prev_BookingFees = test_instance.BookingFees # Assign the default value or fetched data
                        test_instance.BookingFees = BookingFees
                        test_instance.Report_file = processed_files['ChooseFile'],
                        test_instance.Status = Status
                        test_instance.save()

                        # Handle SubTestName if Types is 'Yes'
                        if len(SubTestName_list) != 0 and Types == 'Yes':
                            for res in SubTestName_list:
                                subtestcode = res.get('SubTestId')
                                SubTestName = res.get('SubTestName')
                                Amount_s = res.get('Amount', 0)
                                BookingFees_s = res.get('BookingFees', 0)
                                Amount_f = float(Amount_s) if Amount_s else 0
                                BookingFees_f = float(BookingFees_s) if BookingFees_s else 0
                                Status_ee = res.get('Status')
                                ChooseFile = res.get('ChooseFile','')
                                processed_files = {
                                    'ChooseFile': validate_and_process_file(ChooseFile) if ChooseFile else None,
                                }

                                if subtestcode:
                                    # Update existing SubTest_Details instance
                                    sub_test_inst = SubTest_Details.objects.get(SubTest_Code=subtestcode)
                                    sub_test_inst.Test_Code = test_instance
                                    sub_test_inst.SubTestName = SubTestName
                                    sub_test_inst.Prev_Amount = sub_test_inst.Amount
                                    sub_test_inst.Amount = Amount_f
                                    sub_test_inst.Prev_BookingFees = sub_test_inst.BookingFees
                                    sub_test_inst.BookingFees = BookingFees_f
                                    sub_test_inst.Report_file=processed_files['ChooseFile'],
                                    sub_test_inst.Status = Status_ee
                                    sub_test_inst.save()
                                else:
                                    # Create new SubTest_Details instance
                                    SubTest_Details.objects.create(
                                        Test_Code=test_instance,
                                        SubTestName=SubTestName,
                                        Amount=Amount_f,
                                        BookingFees=BookingFees_f,
                                        Report_file=processed_files['ChooseFile'],
                                        Status='Active',
                                    )
                else:
                    # Create new TestName_Details instance
                    with transaction.atomic():
                        inst_test_name_instance = TestName_Details.objects.create(
                            Radiology_Id=rad_instance,
                            Test_Name=TestName,
                            IsSub_Test=Types,
                            Prev_Amount=Prev_Amount,
                            Amount=Amount,
                            Prev_BookingFees=Prev_BookingFees,
                            BookingFees=BookingFees,
                            Report_file=processed_files['ChooseFile'],
                            Status=Status,
                            created_by=created_by,
                        )

                        if SubTestName_list and Types == 'Yes':
                            for res in SubTestName_list:
                                SubTestName = res.get('SubTestName')
                                Amount_s = res.get('Amount', 0)
                                Amount_f = float(Amount_s) if Amount_s else 0
                                BookingFees_s = res.get('BookingFees', 0)
                                BookingFees_f = float(BookingFees_s) if BookingFees_s else 0
                                Status = res.get('Status')
                                Prev_BookingFees = res.get('Prev_BookingFees', '')
                                Prev_BookingFees = float(Prev_BookingFees) if Prev_BookingFees else 0.0
                                ChooseFile = res.get('ChooseFile','')
                                processed_files = {
                                    'ChooseFile': validate_and_process_file(ChooseFile) if ChooseFile else None,
                                }
                                SubTest_Details.objects.create(
                                    Test_Code=inst_test_name_instance,
                                    SubTestName=SubTestName,
                                    Amount=Amount_f,
                                    Prev_BookingFees=Prev_BookingFees,
                                    BookingFees=BookingFees_f,
                                    Report_file=processed_files['ChooseFile'],
                                    Status=Status,
                                )

                    return JsonResponse({'success': 'TestName Added successfully'})

                return JsonResponse({'success': 'TestName Updated successfully'})

            except Exception as e:
                print(f"An error occurred: {str(e)}")
                return JsonResponse({'error': 'An internal server error occurred'}, status=500)

                        
                        
                    
        elif request.method == 'GET':
            try:

                def get_file_image(filedata):
                    try:
                        mime = magic.Magic(mime=True)
                        contenttype = mime.from_buffer(filedata)

                        # List of supported MIME types
                        supported_mime_types = [
                            'application/pdf',
                            'image/jpeg',
                            'image/png',
                            'application/msword',  # For .doc files
                            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'  # For .docx files
                        ]

                        if contenttype in supported_mime_types:
                            return f'data:{contenttype};base64,{base64.b64encode(filedata).decode("utf-8")}'

                        # If the MIME type is not recognized, return as octet-stream
                        return f'data:application/octet-stream;base64,{base64.b64encode(filedata).decode("utf-8")}'
                    
                    except Exception as e:
                        print(f"Error processing file: {e}")
                        return None

                TestNames = TestName_Details.objects.all()
                TestName_data = []
                
                
                for idss, TestName in enumerate(TestNames, start=1):
                    TestName_dict = {
                        'id': idss,
                        'RadiologyName': TestName.Radiology_Id.Radiology_Name,
                        'locationid': TestName.Radiology_Id.Location_Name.pk,
                        'TestName': TestName.Test_Name,
                        'TestCode': TestName.Test_Code,
                        'Types': TestName.IsSub_Test,
                        'Prev_Amount': TestName.Prev_Amount,
                        'Curr_Amount': TestName.Amount,
                        'Prev_BookingFees':TestName.Prev_BookingFees,
                        'Curr_BookingFees':TestName.BookingFees,
                        'ChooseFile': get_file_image(TestName.Report_file) if TestName.Report_file else None,
                        'Status': TestName.Status,
                        'created_by': TestName.created_by,
                        'Sub_test_data': []
                    }
                    
                    if TestName.IsSub_Test == 'Yes':
                        SubTestNames = SubTest_Details.objects.filter(Test_Code=TestName)
                        for sids, res in enumerate(SubTestNames, start=1):
                            ggg = {
                                'id': sids,
                                'SubTest_Code': res.SubTest_Code,
                                'SubTestName': res.SubTestName,
                                'Prev_Amount': res.Prev_Amount,
                                'Amount': res.Amount,
                                'Prev_BookingFees':res.Prev_BookingFees,
                                'BookingFees':res.BookingFees,
                                'ChooseFile': get_file_image(res.Report_file) if res.Report_file else None,
                                'Status': res.Status
                            }
                            TestName_dict['Sub_test_data'].append(ggg)
                        
                    TestName_data.append(TestName_dict)
                
                return JsonResponse(TestName_data, safe=False)
            
            except Exception as e:
                print(f"An error occurred: {str(e)}")
                return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    else:
        return JsonResponse({'error': 'Invalid credentials'}, status=200)
        





@csrf_exempt
@require_http_methods(["OPTIONS", "GET"])        
def Radiology_details_link_view(request):
    api_key = request.headers.get('Apikey')
    api_password = request.headers.get('Apipassword')
    sessionid = request.headers.get('Sessionid')
    if authenticate_request(sessionid, api_key, api_password):
        try:
            Radiology_Master = RadiologyNames_Details.objects.all()
            
            
            Test_data = []
            index=0
            for rad in Radiology_Master:
                    
                rad_dic={
                    'id':index+1,
                    'RadiologyId':rad.Radiology_Id,
                    'RadiologyName': rad.Radiology_Name,
                    'LocationId': rad.Location_Name.pk,
                    'TestNames':[]
                }
                TestNames = TestName_Details.objects.filter(Radiology_Id=rad,Status='Active')
                testindx=0
                
                for test in TestNames:
                    test_dict={
                        'id':testindx+1,
                        'TestName': test.Test_Name,
                        'TestCode': test.Test_Code,
                        'Types': test.IsSub_Test,
                        'Prev_Amount': test.Prev_Amount,
                        'Curr_Amount': test.Amount,
                        'Sub_test_data': []
                    }
                    if test.IsSub_Test =="Yes":
                        SubTestNames = SubTest_Details.objects.filter(Test_Code=test.Test_Code,Status='Active')
                        subtestindx = 0
                        
                        for subtest in SubTestNames:
                            subtest_dict={
                                'id':subtestindx+1,
                                'SubTest_Code': subtest.SubTest_Code,
                                'SubTestName': subtest.SubTestName,
                                'Prev_Amount': subtest.Prev_Amount,
                                'Amount': subtest.Amount,
                            }
                            test_dict['Sub_test_data'].append(subtest_dict)
                            subtestindx = subtestindx + 1
                            
                    rad_dic['TestNames'].append(test_dict)
                    testindx = testindx + 1
                    
                    
                    
                Test_data.append(rad_dic)
                index = index+ 1
            return JsonResponse(Test_data, safe=False)
        
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    else:
        return JsonResponse({'error': 'Invalid credentials'}, status=200)
        






@csrf_exempt
@require_http_methods(["POST", "GET", "OPTIONS"])
def Booking_fees_link(request):
    api_key = request.headers.get('Apikey')
    api_password = request.headers.get('Apipassword')
    sessionid = request.headers.get('Sessionid')
    if authenticate_request(sessionid, api_key, api_password):
        if request.method == 'POST':
            try:
                data = json.loads(request.body)
                print("Received data:", data)
                
                BasicFeesId = data.get('BasicFeesId', '')
                RadiologyName = data.get("RadiologyName", '')
                AmountDetails = data.get("AmountArray", [])
                Created_by = data.get("created_by", '')
                
                # If BasicFeesId is provided, update existing record
                if BasicFeesId:
                    try:
                        fess_instance = BookingFees_Details.objects.get(Basic_FeesId=BasicFeesId)
                        
                        for amount_detail in AmountDetails:
                            from_value = float(amount_detail.get('From', 0)) if amount_detail.get('From', '').strip() != '' else 0
                            to_value = float(amount_detail.get('To', 0))if amount_detail.get('To', '').strip() != '' else 0
                            amount_value = float(amount_detail.get('Amount', 0))if amount_detail.get('Amount', '').strip() != '' else 0
                            
                            fess_instance.From = from_value
                            fess_instance.To = to_value
                            fess_instance.Amount = amount_value
                            fess_instance.save()
                        
                        return JsonResponse({'success': 'Booking fees updated successfully'}, status=200)
                    
                    except BookingFees_Details.DoesNotExist:
                        return JsonResponse({'warn': 'Booking Fees Id not found'}, status=404)
                    
                # If BasicFeesId is not provided, handle new record creation
                try:
                    rad_instance = RadiologyNames_Details.objects.get(Radiology_Id=RadiologyName)
                except RadiologyNames_Details.DoesNotExist:
                    return JsonResponse({'warn': 'Radiology Name not found'}, status=404)
                
                # Fetch the maximum existing Basic_FeesId and generate the next ID
                max_id = BookingFees_Details.objects.aggregate(max_id=Max('Basic_FeesId'))['max_id']
                next_id = (int(max_id) + 1) if max_id else 1
                
                # Prepare a list of BookingFees_Details instances for bulk creation
                booking_fees_list = []
                for amount_detail in AmountDetails:
                    # from_value = int(amount_detail.get('From', 0))
                    from_value = int(amount_detail.get('From', 0)) if amount_detail.get('From', '').strip() != '' else 0
                    to_value = int(amount_detail.get('To', 0)) if amount_detail.get('To', '').strip() != '' else 0
                    amount_value = int(amount_detail.get('Amount', 0)) if amount_detail.get('Amount', '').strip() != '' else 0
                    
                    booking_fees_list.append(
                        BookingFees_Details(
                            Basic_FeesId=str(next_id),  # Assign unique Basic_FeesId
                            Radiology_Id=rad_instance,
                            From=from_value,
                            To=to_value,
                            Amount= amount_value,
                            created_by=Created_by
                        )
                    )
                    next_id += 1  # Increment the ID for the next record
                
                # Bulk create all the BookingFees_Details instances
                BookingFees_Details.objects.bulk_create(booking_fees_list)
                
                return JsonResponse({'success': 'Booking fees details saved successfully'}, status=200)
            
            except Exception as e:
                print(f"An error occurred: {str(e)}")
                return JsonResponse({'error': 'An internal server error occurred'}, status=500)
        
        elif request.method == 'GET':
            try:
                # Fetch all BookingFees_Details instances
                Basicfess = BookingFees_Details.objects.all()
                
                # Prepare the list to store the data
                Basicpay_data = []
                
                # Iterate over the results and build the dictionary
                for idss, Basicpay in enumerate(Basicfess, start=1):
                    to_value = "above" if Basicpay.To == Decimal('0.00') else (Basicpay.To)
                    from_value = "below" if Basicpay.From == Decimal('0.00') else (Basicpay.From)

                    Basicpay_dict = {
                        'id': idss,
                        'RadiologyName': Basicpay.Radiology_Id.Radiology_Name,
                        'From': from_value,
                        'To': to_value,
                        'Amount': Basicpay.Amount
                    }
                    
                    # Append the dictionary to the list
                    Basicpay_data.append(Basicpay_dict)
                
                # Return the data as a JSON response
                return JsonResponse(Basicpay_data, safe=False)
            
            except Exception as e:
                print(f"An internal server error occurred: {str(e)}")
                return JsonResponse({'error': 'An internal server error occurred'}, status=500)
        
        return JsonResponse({'warn': 'Invalid request method'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid credentials'}, status=200)







@csrf_exempt
@require_http_methods(["GET"])
def Radiology_Department_TestNames(request):
    try:

        Radiologyid = request.GET.get('id', '')
        print("Radiologyid",Radiologyid)

        # Check if Radiology ID is provided
        if not Radiologyid:
            return JsonResponse({'warn': 'Radiology department ID is required'})

        # Fetch the test names related to the selected radiology department
        test_names = TestName_Details.objects.filter(Radiology_Id_id=Radiologyid, Status="Active")

        # Prepare the response data
        testname_data = []
        for test in test_names:
            testname_data.append({
                'id': test.Test_Code,  # Test_Code as ID
                'TestName': test.Test_Name  # Test_Name
            })
            

        # Return the data in JSON format
        return JsonResponse(testname_data, safe=False)
      
    except Exception as e:
        # Handle any exception and return an error response
        print("Exception:", e)
        return JsonResponse({'error': 'An internal server error occurred'}, status=500)



@csrf_exempt
@require_http_methods(["GET"])
def Radiology_TestName_SubTestNames(request):
    try:
        # Get the Testnameid from the request
        Testnameid = request.GET.get('id', '')
        print("Testnameid", Testnameid)

        # Check if the Testnameid is provided
        if not Testnameid:
            return JsonResponse({'warn': 'Testname department ID is required'})

        # Fetch the sub-test names related to the provided testname ID
        test_names = SubTest_Details.objects.filter(Test_Code_id=Testnameid, Status="Active")

        # Prepare the response data
        testname_data = []
        for test in test_names:
            testname_data.append({
                'id': test.SubTest_Code,  # SubTest_Code as ID
                'SubTestName': test.SubTestName  # SubTestName
            })

        # Return the data in JSON format
        return JsonResponse(testname_data, safe=False)

    except Exception as e:
        # Handle any exception and return an error response
        print("Exception:", e)
        return JsonResponse({'error': 'An internal server error occurred'}, status=500)
