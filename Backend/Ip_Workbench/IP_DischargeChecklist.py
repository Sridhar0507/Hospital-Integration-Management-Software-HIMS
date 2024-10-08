from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.db import transaction
import json
from io import BytesIO
from PyPDF2 import PdfReader, PdfWriter
import base64 
from PIL import Image
from django.http import JsonResponse
from .models import *


@csrf_exempt
def IP_Discharge_Checklist_Link(request):
    
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
            file_data = file.split(',')[1]
            file_content = base64.b64decode(file_data)
            file_size = len(file_content)
            
            max_size_mb = 5
            if file_size > max_size_mb * 1024 * 1024:
                print('maximum mb')
                return JsonResponse({'warn': f'File size exceeds the maximum allowed size ({max_size_mb}MB)'})
            file_type = get_file_type(file)
            
            if file_type == 'image/jpeg' or file_type == 'image/png':
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
            data = json.loads(request.body)
            RegistrationId = data.get("RegistrationId")
            EEG = data.get('EEG')
            ECG = data.get('ECG')
            Xray = data.get('Xray')
            CT = data.get('CT')
            MRI = data.get('MRI')
            USG = data.get('USG')
            LabReport = data.get('LabReport')
            MedicalInstrument = data.get('MedicalInstrument')
            OPDFile = data.get('OPDFile')
            OtherReports = data.get('OtherReports')
            IPDBillCleared = data.get('IPDBillCleared')
            DisChargeSummary = data.get('DisChargeSummary')
            GatePass = data.get('GatePass')
            ICRemarks = data.get('ICRemarks')
            MedicineTray = data.get('MedicineTray')
            WaterJug = data.get('WaterJug')
            Glass = data.get('Glass')
            GoodNight = data.get('GoodNight')
            Blanket = data.get('Blanket')
            UrinePot = data.get('UrinePot')
            TVRemote = data.get('TVRemote')
            Others = data.get('Others')
            MaterialRemarks = data.get('MaterialRemarks')
            PatientSignature = data.get('PatientSignature',None)
            RelativeName = data.get('RelativeName')
            RelativeSignature = data.get('RelativeSignature',None)
            SisterIncharge = data.get('SisterIncharge')
            Created_by = data.get('Createdby','')
            
            processed_files = {}

            processed_files['PatientSignature'] = validate_and_process_file(PatientSignature) if PatientSignature else None
            processed_files['RelativeSignature'] = validate_and_process_file(RelativeSignature) if RelativeSignature else None

            if any(isinstance(value, JsonResponse) for value in processed_files.values()):
                for key, value in processed_files.items():
                    if isinstance(value, JsonResponse):
                        return value
            
                        # Get the Patient_IP_Registration_Detials instance
            if RegistrationId:
                registration_ins = Patient_IP_Registration_Detials.objects.get(pk=RegistrationId)
            else:
                return JsonResponse({'error': 'RegistrationId is required'}, status=400)


            with transaction.atomic():
                Discharge_Checklist_instance = IP_Discharge_Checklist.objects.create(
                    Registration_Id = registration_ins,
                    EEG = EEG,
                    ECG = ECG,
                    Xray = Xray,
                    CT = CT,
                    MRI = MRI,
                    USG = USG,
                    LabReport = LabReport,
                    MedicalInstrument = MedicalInstrument,
                    OPDFile = OPDFile,
                    OtherReports =OtherReports,
                    IPDBillCleared = IPDBillCleared,
                    DisChargeSummary = DisChargeSummary,
                    GatePass = GatePass,
                    ICRemarks =ICRemarks,
                    MedicineTray = MedicineTray,
                    WaterJug = WaterJug,
                    Glass = Glass,
                    GoodNight =GoodNight,
                    Blanket = Blanket,
                    UrinePot = UrinePot,
                    TVRemote =TVRemote,
                    Others = Others,
                    MaterialRemarks = MaterialRemarks,
                    PatientSignature = processed_files['PatientSignature'],
                    RelativeSignature = processed_files['RelativeSignature'],
                    RelativeName = RelativeName,
                    SisterIncharge = SisterIncharge,
                    Created_by = Created_by,
                )
                Discharge_Checklist_instance.save()
                
                return JsonResponse({'success':'Discharge Checklist details saved successfully'})
        
        except Patient_IP_Registration_Detials.DoesNotExist:
            return JsonResponse({'error': 'Patient IP registration details not found'}, status=404)
            
        except Exception as e:
             return JsonResponse({"error": str(e)})
         
    elif request.method == 'GET':
        try:
            RegistrationId = request.GET.get('RegistrationId')
            if not RegistrationId:
                return JsonResponse({'error': 'RegistrationId is required'}, status=400)

            Discharge_Checklist_instance = IP_Discharge_Checklist.objects.filter(Registration_Id__pk = RegistrationId)
            
            Discharge_Checklist_data = []
            for idx,discharge in enumerate(Discharge_Checklist_instance,start=1):
                dis_checklist = {
                    'id':idx,
                    'RegistrationId': discharge.Registration_Id.pk,
                    'RelativeName' : discharge.RelativeName,
                    'SisterIncharge' : discharge.SisterIncharge,
                    'CurrDate': discharge.created_at.strftime('%d-%m-%y'),
                    'CurrTime': discharge.created_at.strftime('%I:%M %p'),
                    'Createdby': discharge.Created_by,  
                }
                Discharge_Checklist_data.append(dis_checklist)
                
            return JsonResponse(Discharge_Checklist_data,safe=False)
                
        except Exception as e:
            return JsonResponse({"error":str(e)})
        
@csrf_exempt
def IP_Discharge_Clearance_Link(request):
    
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            RegistrationId = data.get("RegistrationId")
            IBBandOff = data.get('IBBandOff')
            IVCannulaOff = data.get('IVCannulaOff')
            FoleysCathete = data.get('FoleysCathete')
            MedInstruction = data.get('MedInstruction')
            WoundDressing = data.get('WoundDressing')
            DischargeSummary = data.get('DischargeSummary')
            AttenderVisitiorPass = data.get('AttenderVisitiorPass')
            Exitpassgiven = data.get('Exitpassgiven')
            Remarks = data.get('Remarks')
            DischargeClearanceBy = data.get('DischargeClearanceBy')
            Created_by = data.get('Createdby','')
            
            if RegistrationId:
                registration_ins = Patient_IP_Registration_Detials.objects.get(pk=RegistrationId)
            else:
                return JsonResponse({'error': 'RegistrationId is required'}, status=400)


            with transaction.atomic():
                Discharge_Checklist_instance = IP_Discharge_Clearance.objects.create(
                    Registration_Id = registration_ins,
                    IBBandOff = IBBandOff,
                    IVCannulaOff = IVCannulaOff,
                    FoleysCathete = FoleysCathete,
                    MedInstruction = MedInstruction,
                    WoundDressing = WoundDressing,
                    DischargeSummary = DischargeSummary,
                    AttenderVisitiorPass = AttenderVisitiorPass,
                    Exitpassgiven = Exitpassgiven,
                    Remarks = Remarks,
                    DischargeClearanceBy = DischargeClearanceBy,
                    Created_by = Created_by,
                )
                Discharge_Checklist_instance.save()
                
                return JsonResponse({'success':'Discharge Clearance details saved successfully'})
        
        except Patient_IP_Registration_Detials.DoesNotExist:
            return JsonResponse({'error': 'Patient IP registration details not found'}, status=404)
            
        except Exception as e:
             return JsonResponse({"error": str(e)})
         
    elif request.method == 'GET':
        try:
            RegistrationId = request.GET.get('RegistrationId')
            if not RegistrationId:
                return JsonResponse({'error': 'RegistrationId is required'})

            Discharge_Clearance_instance = IP_Discharge_Clearance.objects.filter(Registration_Id__pk = RegistrationId)
            
            Discharge_Clearance_data = []
            for idx,discharge in enumerate(Discharge_Clearance_instance,start=1):
                dis_clearance = {
                    'id':idx,
                    'RegistrationId': discharge.Registration_Id.pk,
                    'DischargeClearanceBy' : discharge.DischargeClearanceBy,
                    'CurrDate': discharge.created_at.strftime('%d-%m-%y'),
                    'CurrTime': discharge.created_at.strftime('%I:%M %p'),
                    'Createdby': discharge.Created_by,  
                }
                Discharge_Clearance_data.append(dis_clearance)
                
            return JsonResponse(Discharge_Clearance_data,safe=False)
                
        except Exception as e:
            return JsonResponse({"error":str(e)})
        
@csrf_exempt
def IP_Physical_Discharge_Link(request):
    
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            RegistrationId = data.get("RegistrationId")
            DrugReturned = data.get('DrugReturned')
            Dischargechecklistdone = data.get('Dischargechecklistdone')
            NursingClearanceDone = data.get('NursingClearanceDone')
            DiagnosticBillClearanceDone = data.get('DiagnosticBillClearanceDone')
            IPDBillClearanceDone = data.get('IPDBillClearanceDone')
            SisterIncharge = data.get('SisterIncharge')
            Remarks = data.get('Remarks')
            Created_by = data.get('Createdby','')
            
            if RegistrationId:
                registration_ins = Patient_IP_Registration_Detials.objects.get(pk=RegistrationId)
            else:
                return JsonResponse({'error': 'RegistrationId is required'}, status=400)


            with transaction.atomic():
                Discharge_Checklist_instance = IP_Physical_Discharge.objects.create(
                    Registration_Id = registration_ins,
                    DrugReturned = DrugReturned,
                    Dischargechecklistdone = Dischargechecklistdone,
                    NursingClearanceDone = NursingClearanceDone,
                    DiagnosticBillClearanceDone = DiagnosticBillClearanceDone,
                    IPDBillClearanceDone = IPDBillClearanceDone,
                    SisterIncharge = SisterIncharge,
                    Remarks = Remarks,
                    Created_by = Created_by,
                )
                Discharge_Checklist_instance.save()
                
                return JsonResponse({'success':'Discharge Clearance details saved successfully'})
        
        except Patient_IP_Registration_Detials.DoesNotExist:
            return JsonResponse({'error': 'Patient IP registration details not found'}, status=404)
            
        except Exception as e:
             return JsonResponse({"error": str(e)})
         
    elif request.method == 'GET':
        try:
            RegistrationId = request.GET.get('RegistrationId')
            if not RegistrationId:
                return JsonResponse({'error': 'RegistrationId is required'})

            Physical_Discharge_instance = IP_Physical_Discharge.objects.filter(Registration_Id__pk = RegistrationId)
            
            Physical_Discharge_data = []
            for idx,discharge in enumerate(Physical_Discharge_instance,start=1):
                physical_dis = {
                    'id':idx,
                    'RegistrationId': discharge.Registration_Id.pk,
                    'SisterIncharge' : discharge.SisterIncharge,
                    'CurrDate': discharge.created_at.strftime('%d-%m-%y'),
                    'CurrTime': discharge.created_at.strftime('%I:%M %p'),
                    'Createdby': discharge.Created_by,  
                }
                Physical_Discharge_data.append(physical_dis)
                
            return JsonResponse(Physical_Discharge_data,safe=False)
                
        except Exception as e:
            return JsonResponse({"error":str(e)})
        