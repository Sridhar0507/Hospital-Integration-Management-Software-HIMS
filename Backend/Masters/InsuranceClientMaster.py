from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import Client_Master_Detials, Insurance_Master_Detials,Donation_Master_Detials
from PIL import Image
from io import BytesIO
from PyPDF2 import PdfReader, PdfWriter
import base64
import magic
import json
from django.db.models import Q
from django.db import transaction

@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def Insurance_Client_Master_Detials_link(request):
    @transaction.atomic
    def validate_and_process_file(file):
        def get_file_type(file):
            if file.startswith('data:application/pdf;base64'):
                return 'application/pdf'
            elif file.startswith('data:image/jpeg;base64') or file.startswith('data:image/jpg;base64'):
                return 'image/jpeg'
            elif file.startswith('data:image/png;base64'):
                return 'image/png'
            else:
                return 'unknown'

        def compress_image(image, min_quality=10, step=5):
            output = BytesIO()
            quality = 95
            compressed_data = None
            while quality >= min_quality:
                output.seek(0)
                image.save(output, format='JPEG', quality=quality)
                compressed_data = output.getvalue()
                quality -= step
            output.seek(0)
            compressed_size = len(compressed_data)
            return compressed_data, compressed_size

        def compress_pdf(file):
            output = BytesIO()
            reader = PdfReader(file)
            writer = PdfWriter()
            for page_num in range(len(reader.pages)):
                writer.add_page(reader.pages[page_num])
            writer.write(output)
            compressed_data = output.getvalue()
            compressed_size = len(compressed_data)
            return compressed_data, compressed_size

        if file:
            file_data = file.split(',')[1] if ',' in file else file
            file_content = base64.b64decode(file_data)
            file_size = len(file_content)
            max_size_mb = 5

            if file_size > max_size_mb * 1024 * 1024:
                return JsonResponse({'warn': f'File size exceeds the maximum allowed size ({max_size_mb}MB)'})

            file_type = get_file_type(file)

            if file_type in ['image/jpeg', 'image/png']:
                try:
                    image = Image.open(BytesIO(file_content))
                    if image.mode in ('RGBA', 'P'):
                        image = image.convert('RGB')
                    compressed_image_data, compressed_size = compress_image(image)
                    return compressed_image_data
                except Exception as e:
                    return JsonResponse({'error': f'Error processing image: {str(e)}'})

            elif file_type == 'application/pdf':
                try:
                    compressed_pdf_data, compressed_size = compress_pdf(BytesIO(file_content))
                    return compressed_pdf_data
                except Exception as e:
                    return JsonResponse({'error': f'Error processing PDF: {str(e)}'})

            else:
                return JsonResponse({'warn': 'Unsupported file format'})

        return None

    if request.method == 'POST':
        try:
            data = request.POST
            MasterType = data.get('MasterType', '')
            print(data)
            # Insurance data
            Code = data.get('Code', '')
            Name = data.get('Name', '')   
            MsType = data.get('Type', '')
            TPAName = data.get('TPAName', '')
            PolicyType = data.get('PolicyType', '')
            PayerZone = data.get('PayerZone', '')  # Corrected key
            PayerMemberId = data.get('PayerMemberId', '')

            ContactPerson = data.get('ContactPerson', '')
            Designation = data.get('Designation', '')
            PancardNo = data.get('PancardNo', '')
            MsCIN = data.get('CIN', '')
            MsTAN = data.get('TAN', '')
            MailId = data.get('MailId', '')
            PhoneNumber = data.get('PhoneNumber', '')
            Address = data.get('Address', '')
            OtherDocuments1 = data.get('OtherDocuments1', None)
            OtherDocuments2 = data.get('OtherDocuments2', None)
            OtherDocuments3 = data.get('OtherDocuments3', None)

            processedOtherDocuments1 = validate_and_process_file(OtherDocuments1) if OtherDocuments1  else None
            processedOtherDocuments2 = validate_and_process_file(OtherDocuments2) if OtherDocuments2  else None
            processedOtherDocuments3 = validate_and_process_file(OtherDocuments3) if OtherDocuments3  else None

            created_by = data.get('created_by', '')
            with transaction.atomic():
                if MasterType == 'Insurance':
                    if Code:
                        if Insurance_Master_Detials.objects.filter(
                            Insurance_Name=Name,
                            Type=MsType,TPA_Name=TPAName).exclude(pk=Code).exists():
                            return JsonResponse({'warn': 'Insurance Name already exists'})
                        
                        else:
                            Insurance_instance = Insurance_Master_Detials.objects.get(pk=Code)
                            Insurance_instance.Insurance_Name = Name
                            Insurance_instance.Type = MsType
                            Insurance_instance.TPA_Name = TPAName
                            Insurance_instance.Policy_Type = PolicyType
                            Insurance_instance.Payer_Zone = PayerZone
                            Insurance_instance.PayerMember_Id = PayerMemberId
                            Insurance_instance.ContactPerson = ContactPerson
                            Insurance_instance.MailId = MailId
                            Insurance_instance.PhoneNumber = PhoneNumber
                            Insurance_instance.TreatmentList = processedOtherDocuments1
                            Insurance_instance.OtherDocuments = processedOtherDocuments2
                            Insurance_instance.save()
                            return JsonResponse({'success': f'{MasterType} Details Updated successfully'})
                    else:
                        if Insurance_Master_Detials.objects.filter(
                            Insurance_Name=Name,
                            Type=MsType,TPA_Name=TPAName).exists():
                            return JsonResponse({'warn': 'Insurance Name already exists'})

                        Insurance_instance = Insurance_Master_Detials.objects.create(
                            Insurance_Name=Name,
                            Type=MsType,
                            TPA_Name=TPAName,
                            Policy_Type=PolicyType,
                            Payer_Zone=PayerZone,
                            PayerMember_Id=PayerMemberId,
                            ContactPerson=ContactPerson,
                            MailId=MailId,
                            PhoneNumber=PhoneNumber,
                            TreatmentList=processedOtherDocuments1,
                            OtherDocuments=processedOtherDocuments2,
                            created_by=created_by
                        )
                        return JsonResponse({'success': f'{MasterType} Details added successfully'})
                elif MasterType == 'Client':
                    if Code:
                        if Client_Master_Detials.objects.filter(Client_Name=Name).exclude(pk=Code).exists():
                            return JsonResponse({'warn': 'Client Name already exists'})
                        else:  
                            Client_instance = Client_Master_Detials.objects.get(pk=Code)
                            Client_instance.Client_Name = Name
                            Client_instance.ContactPerson = ContactPerson
                            Client_instance.MailId = MailId
                            Client_instance.PhoneNumber = PhoneNumber
                            Client_instance.Address = Address
                            Client_instance.TreatmentList = processedOtherDocuments1
                            Client_instance.OtherDocuments = processedOtherDocuments2
                            Client_instance.save()
                            return JsonResponse({'success': f'{MasterType} Details Updated successfully'})
                    else:
                        if Client_Master_Detials.objects.filter(Client_Name=Name).exists():
                            return JsonResponse({'warn': 'Client Name already exists'})

                        Client_instance = Client_Master_Detials.objects.create(
                            Client_Name=Name,
                            ContactPerson=ContactPerson,
                            MailId=MailId,
                            PhoneNumber=PhoneNumber,
                            Address=Address,
                            TreatmentList=processedOtherDocuments1,
                            OtherDocuments=processedOtherDocuments2,
                            created_by=created_by
                        )
                        return JsonResponse({'success': f'{MasterType} Details added successfully'})
                else:
                    if Code:
                        if Donation_Master_Detials.objects.filter(Donation_Name=Name).exclude(pk=Code).exists():
                            return JsonResponse({'warn': 'Donation Name already exists'})
                        else:  
                            Donation_instance = Donation_Master_Detials.objects.get(pk=Code)
                            Donation_instance.Donation_Name = Name
                            Donation_instance.Type = MsType
                            Donation_instance.ContactPerson = ContactPerson
                            Donation_instance.Designation = Designation
                            Donation_instance.PancardNo = PancardNo
                            Donation_instance.CIN = MsCIN
                            Donation_instance.TAN = MsTAN
                            Donation_instance.MailId = MailId
                            Donation_instance.PhoneNumber = PhoneNumber
                            Donation_instance.Address = Address
                            Donation_instance.Document1 = processedOtherDocuments1
                            Donation_instance.Document2 = processedOtherDocuments2
                            Donation_instance.Document3 = processedOtherDocuments3
                            Donation_instance.save()
                            return JsonResponse({'success': f'{MasterType} Details Updated successfully'})
                    else:
                        if Donation_Master_Detials.objects.filter(Donation_Name=Name).exists():
                            return JsonResponse({'warn': 'Donation Name already exists'})

                        Donation_instance = Donation_Master_Detials.objects.create(
                            Donation_Name = Name,
                            Type=MsType,
                            ContactPerson = ContactPerson,
                            Designation = Designation,
                            PancardNo = PancardNo,
                            CIN = MsCIN,
                            TAN = MsTAN,
                            MailId = MailId,
                            PhoneNumber = PhoneNumber,
                            Address = Address,
                            Document1 = processedOtherDocuments1,
                            Document2 = processedOtherDocuments2,
                            Document3 = processedOtherDocuments3,
                            created_by=created_by
                        )
                        return JsonResponse({'success': f'{MasterType} Details added successfully'})
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)

    elif request.method == 'GET':
        try:
            def get_file_image(filedata):
                mime = magic.Magic()
                contenttype = mime.from_buffer(filedata).split(',')[0]
                contenttype1 = 'application/pdf'
                if contenttype == 'application/pdf':
                    contenttype1 = 'application/pdf'
                elif contenttype == 'JPEG image data':
                    contenttype1 = 'image/jpeg'
                elif contenttype == 'PNG image data':
                    contenttype1 = 'image/png'

                return f'data:{contenttype1};base64,{base64.b64encode(filedata).decode("utf-8")}'
            
          
            MasterType = request.GET.get('MasterType')
            Type = request.GET.get('Type')
            SearchBy = request.GET.get('SearchBy')
          
            
            if MasterType == 'Insurance':
                Insurance_Client_Donation_ins = Insurance_Master_Detials.objects.filter(
                    Q(Type__icontains=Type) & (Q(Insurance_Name__icontains=SearchBy) | Q(Insurance_Id__icontains=SearchBy))
                )[:10]
            elif MasterType == 'Client':
                Insurance_Client_Donation_ins = Client_Master_Detials.objects.filter(
                    Q(Client_Name__icontains=SearchBy) | Q(Client_Id__icontains=SearchBy)
                )[:10]
            else:
                Insurance_Client_Donation_ins = Donation_Master_Detials.objects.filter(
                    Q(Type__icontains=Type) & (Q(Donation_Name__icontains=SearchBy) | Q(Donation_Id__icontains=SearchBy))
                )[:10]
                

            Insurance_Client_Donation_data = []
            for InsCli in Insurance_Client_Donation_ins:
                InsCli_dict = {}
                if MasterType == 'Insurance':
                    InsCli_dict = {
                        'id': InsCli.Insurance_Id,
                        'Name': InsCli.Insurance_Name,
                        'Type': InsCli.Type,
                        'TPAName': InsCli.TPA_Name,
                        'PolicyType': InsCli.Policy_Type,
                        'PayerZone': InsCli.Payer_Zone,
                        'PayerMemberId': InsCli.PayerMember_Id,
                        'ContactPerson': InsCli.ContactPerson,
                        'MailId': InsCli.MailId,
                        'PhoneNumber': InsCli.PhoneNumber,
                        'TreatmentList': get_file_image(InsCli.TreatmentList) if InsCli.TreatmentList else None,
                        'OtherDocuments': get_file_image(InsCli.OtherDocuments) if InsCli.OtherDocuments else None,
                        'Status': 'Active' if InsCli.Status else 'Inactive',
                        'CreatedBy': InsCli.created_by,
                    }
                elif MasterType == 'Client':
                    InsCli_dict = {
                        'id': InsCli.Client_Id,
                        'Name': InsCli.Client_Name,
                        'ContactPerson': InsCli.ContactPerson,
                        'MailId': InsCli.MailId,
                        'PhoneNumber': InsCli.PhoneNumber,
                        'Address': InsCli.Address,
                        'TreatmentList': get_file_image(InsCli.TreatmentList) if InsCli.TreatmentList else None,
                        'OtherDocuments': get_file_image(InsCli.OtherDocuments) if InsCli.OtherDocuments else None,
                        'Status': 'Active' if InsCli.Status else 'Inactive',
                        'CreatedBy': InsCli.created_by,
                    }
                else:
                    InsCli_dict = {
                        'id': InsCli.Donation_Id,
                        'Name': InsCli.Donation_Name,
                        'Type': InsCli.Type,
                        'ContactPerson': InsCli.ContactPerson,
                        'Designation': InsCli.Designation,
                        'PancardNo': InsCli.PancardNo,
                        'CIN': InsCli.CIN,
                        'TAN': InsCli.TAN,
                        'MailId': InsCli.MailId,
                        'PhoneNumber': InsCli.PhoneNumber,
                        'Address': InsCli.Address,
                        'Document1': get_file_image(InsCli.Document1) if InsCli.Document1 else None,
                        'Document2': get_file_image(InsCli.Document2) if InsCli.Document2 else None,
                        'Document3': get_file_image(InsCli.Document3) if InsCli.Document3 else None,
                        'Status': 'Active' if InsCli.Status else 'Inactive',
                        'CreatedBy': InsCli.created_by,
                    }
                Insurance_Client_Donation_data.append(InsCli_dict)

            return JsonResponse(Insurance_Client_Donation_data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)




@csrf_exempt
def update_status_Insurance_Client_Detials_link(request):
    try:
        data = json.loads(request.body)
        print(data)
        MasterType = data.get('MasterType', '')

        # Insurance data
        id = data.get('id', '')   
        # Retrieve data from Doctor_Personal_Form_Detials
        if MasterType == 'Insurance':
            if id:
                
                Insurance_data = Insurance_Master_Detials.objects.get(Insurance_Id = id)
                Insurance_data.Status = not Insurance_data.Status
                Insurance_data.save()
                return JsonResponse({'success': 'Insurance Status Updated successfully'})
            
        elif MasterType =='Client':
            if id:
                
                Client_data = Client_Master_Detials.objects.get(Client_Id = id)
                Client_data.Status = not Client_data.Status
                Client_data.save()
                return JsonResponse({'success': 'Client Status Updated successfully'})
        else:
            if id:
                Donation_data=Donation_Master_Detials.objects.get(Donation_Id = id) 
                Donation_data.Status = not Donation_data.Status
                Donation_data.save()
                return JsonResponse({'success': 'Donation Status Updated successfully'})  

        # Return JSON response
       
    
    except Exception as e:
        # Handle exceptions and return error response
        return JsonResponse({'error': str(e)})


@csrf_exempt
def get_insurance_client_name(request):
    try:
        Insurance_data = Insurance_Master_Detials.objects.filter(Status=True).values('Insurance_Name').distinct()
        data=[]
        for ins in Insurance_data:
            data.append(ins)
        return JsonResponse(data,safe=False)  
       
    
    except Exception as e:
        # Handle exceptions and return error response
        return JsonResponse({'error': str(e)})





@csrf_exempt
def get_insurance_data_registration(request):
    try:
        Insurance_data = Insurance_Master_Detials.objects.filter(Status=True).order_by('Insurance_Name','Type')
        data=[]
        indx=0
        for ins in Insurance_data:
            data.append({
                'indx':indx+1,
                'id':ins.Insurance_Id,
                'Name':ins.Insurance_Name,
                'Type':ins.Type,
                'TPA_Name':ins.TPA_Name,
            })
            indx =+ 1
        return JsonResponse(data,safe=False)  
       
    
    except Exception as e:
        # Handle exceptions and return error response
        return JsonResponse({'error': str(e)})


@csrf_exempt
def get_client_data_registration(request):
    try:
        client_data = Client_Master_Detials.objects.filter(Status=True)
        data=[]
        indx=0
        for cli in client_data:
            data.append({
                'indx':indx+1,
                'id':cli.Client_Id,
                'Name':cli.Client_Name
            })
        return JsonResponse(data,safe=False)  
       
    
    except Exception as e:
        # Handle exceptions and return error response
        return JsonResponse({'error': str(e)})


@csrf_exempt
def get_donation_data_registration(request):
    try:
        donation_data = Donation_Master_Detials.objects.filter(Status=True).order_by('Type','Donation_Name')
        data=[]
        indx=0
        for don in donation_data:
            data.append({
                'indx':indx+1,
                'id':don.Donation_Id,
                'Name':don.Donation_Name,
                'Type':don.Type
            })
        return JsonResponse(data,safe=False)  
       
    
    except Exception as e:
        # Handle exceptions and return error response
        return JsonResponse({'error': str(e)})



