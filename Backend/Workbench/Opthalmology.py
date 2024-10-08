import re
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import base64
import io
import json
import uuid
from .models import *
import base64
import re
from django.core.files.base import ContentFile
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404


@csrf_exempt
@require_http_methods(["POST", "GET"])
def Workbench_Opthalmology_Details(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            # print(data, 'data')

            # Extract data
            PGPODSph = data.get('PGPODSph', '')
            PGPODCyl = data.get('PGPODCyl', '')
            PGPODAxs = data.get('PGPODAxs', '')
            PGPOsSph = data.get('PGPOsSph', '')
            PGPOsCyl = data.get('PGPOsCyl', '')
            PGPOsAxs = data.get('PGPOsAxs', '')
            ODadd = data.get('ODadd', '')
            OSadd = data.get('OSadd', '')

            chiefComplaints = data.get('chiefComplaints', '')
            history = data.get('history', '')

            ARODSph = data.get('ARODSph', '')
            ARODCyl = data.get('ARODCyl', '')
            ARODAxs = data.get('ARODAxs', '')
            AROsSph = data.get('AROsSph', '')
            AROsCyl = data.get('AROsCyl', '')
            AROsAxs = data.get('AROsAxs', '')

            powerODVision = data.get('powerODVision', '')
            powerOSVision = data.get('powerOSVision', '')
            crxODVision = data.get('crxODVision', '')
            crxOSVision = data.get('crxOSVision', '')
            cphODVision = data.get('cphODVision', '')
            cphOSVision = data.get('cphOSVision', '')

            SubODSph = data.get('SubODSph', '')
            SubODCyl = data.get('SubODCyl', '')
            SubODAxs = data.get('SubODAxs', '')
            SubODVa = data.get('SubODVa', '')
            SubOsSph = data.get('SubOsSph', '')
            SubOsCyl = data.get('SubOsCyl', '')
            SubOsAxs = data.get('SubOsAxs', '')
            SubOsVa = data.get('SubOsVa', '')
            SubODadd = data.get('SubODadd', '')
            SubOSadd = data.get('SubOSadd', '')

            DilODSph = data.get('DilODSph', '')
            DilODCyl = data.get('DilODCyl', '')
            DilODAxs = data.get('DilODAxs', '')
            DilOsSph = data.get('DilOsSph', '')
            DilOsCyl = data.get('DilOsCyl', '')
            DilOsAxs = data.get('DilOsAxs', '')

            DilAccODSph = data.get('DilAccODSph', '')
            DilAccODCyl = data.get('DilAccODCyl', '')
            DilAccODAxs = data.get('DilAccODAxs', '')
            DilAccODVa = data.get('DilAccODVa', '')
            DilAccOSSph = data.get('DilAccOSSph', '')
            DilAccOSCyl = data.get('DilAccOSCyl', '')
            DilAccOSAxs = data.get('DilAccOSAxs', '')
            DilAccOSVa = data.get('DilAccOSVa', '')

            AntSegOD = data.get('AntSegOD', '')
            AntSegOS = data.get('AntSegOS', '')
            LensOD = data.get('LensOD', '')
            LensOS = data.get('LensOS', '')
            FundusOD = data.get('FundusOD', '')
            FundusOS = data.get('FundusOS', '')

            Atiop = data.get('ATIOP', '')
            Nctiop = data.get('NCTIOP', '')
            Osatiop = data.get('OSATIOP', '')
            Osnctiop = data.get('OSNCTIOP', '')

            SacSyringing = data.get('SacSyringing', '')
            SacSyringingSecond = data.get('SacSyringingSecond', '')

            SubODDiagnosis = data.get('SubODDiagnosis', '')
            SubOSDiagnosis = data.get('SubOSDiagnosis', '')
            Treatment = data.get('Treatment', '')
            followUp = data.get('followUp', '')

            rightSPH = data.get('rightSPH', '')
            rightCYL = data.get('rightCYL', '')
            rightAXIS = data.get('rightAXIS', '')
            rightVA = data.get('rightVA', '')
            leftSPH = data.get('leftSPH', '')
            leftCYL = data.get('leftCYL', '')
            leftAXIS = data.get('leftAXIS', '')
            leftVA = data.get('leftVA', '')

            rightNearSPH = data.get('rightNearSPH', '')
            rightNearCYL = data.get('rightNearCYL', '')
            rightNearAXIS = data.get('rightNearAXIS', '')
            rightNearVA = data.get('rightNearVA', '')
            leftNearSPH = data.get('leftNearSPH', '')
            leftNearCYL = data.get('leftNearCYL', '')
            leftNearAXIS = data.get('leftNearAXIS', '')
            leftNearVA = data.get('leftNearVA', '')

            rightPrism = data.get('rightPrism', '')
            rightPrismValue = data.get('rightPrismValue', '')
            leftPrism = data.get('leftPrism', '')
            leftPrismValue = data.get('leftPrismValue', '')
            rightPrism2 = data.get('rightPrism2', '')
            rightPrism2Value = data.get('rightPrism2Value', '')
            leftPrism2 = data.get('leftPrism2', '')
            leftPrism2Value = data.get('leftPrism2Value', '')
            drainsData2 = data.get('drainsData2', [])
            
            # canvasDrawings = data.get('canvasDrawings', {})

            # print(canvasDrawings,'canvasDrawings')

            remarks = data.get('remarks', '')
            PatientId = data.get('PatientId', '')
            VisitId = data.get('VisitId', '')
            created_by = data.get('created_by', '')
            canvas_drawings = data.get('canvas_drawings', {})

           # Save Workbench_Opthalmology instance only once
           
            # Print the data for debugging
            print(drainsData2, 'drainsData2')
            print(canvas_drawings, 'canvas_drawings')


            try:
                patient_instance = Patient_Detials.objects.get(pk=PatientId)
            except Patient_Detials.DoesNotExist:
                return JsonResponse({'error': 'Patient not found'})


            # Save Workbench_Opthalmology Vision instances
            for arrayData in drainsData2:
                print(arrayData, 'arrayData')

                Opthalmology_instance = Workbench_Opthalmology(
                    rightSPH=arrayData.get('rightSPH'),
                    rightCYL=arrayData.get('rightCYL'),
                    rightAXIS=arrayData.get('rightAXIS'),
                    rightVA=arrayData.get('rightVA'),
                    leftSPH=arrayData.get('leftSPH'),
                    leftCYL=arrayData.get('leftCYL'),
                    leftAXIS=arrayData.get('leftAXIS'),
                    leftVA=arrayData.get('leftVA'),
                    rightNearSPH=arrayData.get('rightNearSPH'),
                    rightNearCYL=arrayData.get('rightNearCYL'),
                    rightNearAXIS=arrayData.get('rightNearAXIS'),
                    rightNearVA=arrayData.get('rightNearVA'),
                    leftNearSPH=arrayData.get('leftNearSPH'),
                    leftNearCYL=arrayData.get('leftNearCYL'),
                    leftNearAXIS=arrayData.get('leftNearAXIS'),
                    leftNearVA=arrayData.get('leftNearVA'),
                    rightPrism=arrayData.get('rightPrism'),
                    rightPrismValue=arrayData.get('rightPrismValue'),
                    leftPrism=arrayData.get('leftPrism'),
                    leftPrismValue=arrayData.get('leftPrismValue'),
                    rightPrism2=arrayData.get('rightPrism2'),
                    rightPrism2Value=arrayData.get('rightPrism2Value'),
                    leftPrism2=arrayData.get('leftPrism2'),
                    leftPrism2Value=arrayData.get('leftPrism2Value'),
                    PatientId=patient_instance,
                    VisitId=VisitId,
                    PGPODSph=PGPODSph,
                    PGPODCyl=PGPODCyl,
                    PGPODAxs=PGPODAxs,
                    PGPOsSph=PGPOsSph,
                    PGPOsCyl=PGPOsCyl,
                    PGPOsAxs=PGPOsAxs,
                    ODadd=ODadd,
                    OSadd=OSadd,
                    chiefComplaints=chiefComplaints,
                    history=history,
                    ARODSph=ARODSph,
                    ARODCyl=ARODCyl,
                    ARODAxs=ARODAxs,
                    AROsSph=AROsSph,
                    AROsCyl=AROsCyl,
                    AROsAxs=AROsAxs,
                    powerODVision=powerODVision,
                    powerOSVision=powerOSVision,
                    crxODVision=crxODVision,
                    crxOSVision=crxOSVision,
                    cphODVision=cphODVision,
                    cphOSVision=cphOSVision,
                    SubODSph=SubODSph,
                    SubODCyl=SubODCyl,
                    SubODAxs=SubODAxs,
                    SubODVa=SubODVa,
                    SubOsSph=SubOsSph,
                    SubOsCyl=SubOsCyl,
                    SubOsAxs=SubOsAxs,
                    SubOsVa=SubOsVa,
                    SubODadd=SubODadd,
                    SubOSadd=SubOSadd,
                    DilODSph=DilODSph,
                    DilODCyl=DilODCyl,
                    DilODAxs=DilODAxs,
                    DilOsSph=DilOsSph,
                    DilOsCyl=DilOsCyl,
                    DilOsAxs=DilOsAxs,
                    DilAccODSph=DilAccODSph,
                    DilAccODCyl=DilAccODCyl,
                    DilAccODAxs=DilAccODAxs,
                    DilAccODVa=DilAccODVa,
                    DilAccOSSph=DilAccOSSph,
                    DilAccOSCyl=DilAccOSCyl,
                    DilAccOSAxs=DilAccOSAxs,
                    DilAccOSVa=DilAccOSVa,
                    ATIOP=Atiop,
                    NCTIOP=Nctiop,
                    OSATIOP=Osatiop,
                    OSNCTIOP=Osnctiop,
                    SacSyringing=SacSyringing,
                    SacSyringingSecond=SacSyringingSecond,
                    SubODDiagnosis=SubODDiagnosis,
                    SubOSDiagnosis=SubOSDiagnosis,
                    Treatment=Treatment,
                    followUp=followUp,
                    remarks=remarks,
                    created_by=created_by
                    )
                Opthalmology_instance.save()

                
            
            # canvas_drawings = {
            # 'antSegOD': data.get('antSegOD', ''),
            # 'antSegOS': data.get('antSegOS', ''),
            # 'lensOD': data.get('lensOD', ''),
            # 'lensOS': data.get('lensOS', ''),
            # 'fundusOD': data.get('fundusOD', ''),
            # 'fundusOS': data.get('fundusOS', '')
            # }
            # opthalmology_instance = Workbench_Opthalmology.objects.get(pk=data.get('Id'))

            vision_draw_instance = Workbench_Opthalmology_VisionDraw(
            Id=Opthalmology_instance,
            PatientId=patient_instance,  # Use the Patient instance
            VisitId=VisitId,
            created_by=created_by
            )
            
            vision_draw_instance.save(canvas_drawings=canvas_drawings)

            # Save images from base64 data
            # vision_draw_instance.save(canvas_drawings=canvas_drawings)

            
           

            return JsonResponse({'success': 'Opthalmology Details added successfully'})

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)

    elif request.method == 'GET':
        try:
            PatientId = request.GET.get('PatientId')
            print(PatientId, 'patient_id')

            try:
                patient_instance = Patient_Detials.objects.get(pk=PatientId)
            except Patient_Detials.DoesNotExist:
                return JsonResponse({'error': 'Patient not found'}, status=404)

            print(patient_instance, 'patient_instance')
            opthalmologies = Workbench_Opthalmology.objects.filter(PatientId=patient_instance)
            print(opthalmologies, 'opthalmologiessss')

            def convert_to_base64(binary_data):
                if binary_data:
                    return base64.b64encode(binary_data).decode('utf-8')
                return ''

            # Create a list to store the result
            opthalmology_data = []

            for optho in opthalmologies:
                # Assuming one vision draw per ophthalmology; adjust if it's a different relationship
                try:
                    optho_vision = Workbench_Opthalmology_VisionDraw.objects.get(Id=optho)
                except ObjectDoesNotExist:
                    optho_vision = None

                opthalmology_data.append({
                    'id': optho.Id,
                    'PatientId': optho.PatientId.pk,
                    'VisitId': optho.VisitId,
                    'PGPODSph': optho.PGPODSph,
                    'PGPODCyl': optho.PGPODCyl,
                    'PGPODAxs': optho.PGPODAxs,
                    'PGPOsSph': optho.PGPOsSph,
                    'PGPOsCyl': optho.PGPOsCyl,
                    'PGPOsAxs': optho.PGPOsAxs,
                    'ODadd': optho.ODadd,
                    'OSadd': optho.OSadd,
                    'chiefComplaints': optho.chiefComplaints,
                    'history': optho.history,
                    'ARODSph': optho.ARODSph,
                    'ARODCyl': optho.ARODCyl,
                    'ARODAxs': optho.ARODAxs,
                    'AROsSph': optho.AROsSph,
                    'AROsCyl': optho.AROsCyl,
                    'AROsAxs': optho.AROsAxs,
                    'powerODVision': optho.powerODVision,
                    'powerOSVision': optho.powerOSVision,
                    'crxODVision': optho.crxODVision,
                    'crxOSVision': optho.crxOSVision,
                    'cphODVision': optho.cphODVision,
                    'cphOSVision': optho.cphOSVision,
                    'SubODSph': optho.SubODSph,
                    'SubODCyl': optho.SubODCyl,
                    'SubODAxs': optho.SubODAxs,
                    'SubODVa': optho.SubODVa,
                    'SubOsSph': optho.SubOsSph,
                    'SubOsCyl': optho.SubOsCyl,
                    'SubOsAxs': optho.SubOsAxs,
                    'SubOsVa': optho.SubOsVa,
                    'SubODadd': optho.SubODadd,
                    'SubOSadd': optho.SubOSadd,
                    'DilODSph': optho.DilODSph,
                    'DilODCyl': optho.DilODCyl,
                    'DilODAxs': optho.DilODAxs,
                    'DilOsSph': optho.DilOsSph,
                    'DilOsCyl': optho.DilOsCyl,
                    'DilOsAxs': optho.DilOsAxs,
                    'DilAccODSph': optho.DilAccODSph,
                    'DilAccODCyl': optho.DilAccODCyl,
                    'DilAccODAxs': optho.DilAccODAxs,
                    'DilAccODVa': optho.DilAccODVa,
                    'DilAccOSSph': optho.DilAccOSSph,
                    'DilAccOSCyl': optho.DilAccOSCyl,
                    'DilAccOSAxs': optho.DilAccOSAxs,
                    'DilAccOSVa': optho.DilAccOSVa,
                    'Atiop': optho.ATIOP,
                    'Nctiop': optho.NCTIOP,
                    'Osatiop': optho.OSATIOP,
                    'Osnctiop': optho.OSNCTIOP,
                    'SacSyringing': optho.SacSyringing,
                    'SacSyringingSecond': optho.SacSyringingSecond,
                    'SubODDiagnosis': optho.SubODDiagnosis,
                    'SubOSDiagnosis': optho.SubOSDiagnosis,
                    'Treatment': optho.Treatment,
                    'followUp': optho.followUp,
                    'remarks': optho.remarks,
                    'rightSPH': optho.rightSPH,
                    'rightCYL': optho.rightCYL,
                    'rightAXIS': optho.rightAXIS,
                    'rightVA': optho.rightVA,
                    'leftSPH': optho.leftSPH,
                    'leftCYL': optho.leftCYL,
                    'leftAXIS': optho.leftAXIS,
                    'leftVA': optho.leftVA,
                    'rightNearSPH': optho.rightNearSPH,
                    'rightNearCYL': optho.rightNearCYL,
                    'rightNearAXIS': optho.rightNearAXIS,
                    'rightNearVA': optho.rightNearVA,
                    'leftNearSPH': optho.leftNearSPH,
                    'leftNearCYL': optho.leftNearCYL,
                    'leftNearAXIS': optho.leftNearAXIS,
                    'leftNearVA': optho.leftNearVA,
                    'rightPrism': optho.rightPrism,
                    'rightPrismValue': optho.rightPrismValue,
                    'leftPrism': optho.leftPrism,
                    'leftPrismValue': optho.leftPrismValue,
                    'rightPrism2': optho.rightPrism2,
                    'rightPrism2Value': optho.rightPrism2Value,
                    'leftPrism2': optho.leftPrism2,
                    'leftPrism2Value': optho.leftPrism2Value,
                    'created_by': optho.created_by,
                    'Date': optho.created_at.strftime('%Y-%m-%d'),
                    'Time': optho.created_at.strftime('%H:%M:%S'),
                    'VisionDraw': {
                        'antSegOD': convert_to_base64(optho_vision.AntSegOD) if optho_vision and optho_vision.AntSegOD else '',
                        'antSegOS': convert_to_base64(optho_vision.AntSegOS) if optho_vision and optho_vision.AntSegOS else '',
                        'lensOD': convert_to_base64(optho_vision.LensOD) if optho_vision and optho_vision.LensOD else '',
                        'lensOS': convert_to_base64(optho_vision.LensOS) if optho_vision and optho_vision.LensOS else '',
                        'fundusOD': convert_to_base64(optho_vision.FundusOD) if optho_vision and optho_vision.FundusOD else '',
                        'fundusOS': convert_to_base64(optho_vision.FundusOS) if optho_vision and optho_vision.FundusOS else ''
                    }
                })

            return JsonResponse({'Opthalmology_Data': opthalmology_data})

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    else:
   
        return JsonResponse({'error': 'Method not allowed'})




@csrf_exempt
@require_http_methods(["POST", "GET"])
def Workbench_Annotation_Details(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print(data, 'data')
            canvasData = data.get('canvasData', {})
            print(canvasData, 'canvasData')

            PatientId = data.get('PatientId')  # Ensure PatientId is provided

            if not PatientId:
                return JsonResponse({'error': 'PatientId is required'}, status=400)

            try:
                patient_instance = Patient_Detials.objects.get(pk=PatientId)
            except Patient_Detials.DoesNotExist:
                return JsonResponse({'error': 'Patient not found'}, status=404)

            vision_draw_instance = Workbench_Annotation_VisionDraw(
                PatientId=patient_instance,
                AntSegOD=decode_base64(canvasData.get('antSegOD', {}).get('image')),
                AntSegOS=decode_base64(canvasData.get('antSegOS', {}).get('image')),
                LensOD=decode_base64(canvasData.get('lensOD', {}).get('image')),
                LensOS=decode_base64(canvasData.get('lensOS', {}).get('image')),
                FundusOD=decode_base64(canvasData.get('fundusOD', {}).get('image')),
                FundusOS=decode_base64(canvasData.get('fundusOS', {}).get('image')),
            )
            vision_draw_instance.save()

            return JsonResponse({'success': 'Opthalmology Details added successfully'})

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)

    elif request.method == 'GET':
        try:
            PatientId = request.GET.get('PatientId')
            if not PatientId:
                return JsonResponse({'error': 'PatientId is required'}, status=400)

            try:
                patient_instance = Patient_Detials.objects.get(pk=PatientId)
            except Patient_Detials.DoesNotExist:
                return JsonResponse({'error': 'Patient not found'}, status=404)

            opthalmology_visions = Workbench_Annotation_VisionDraw.objects.filter(PatientId=patient_instance)

            def convert_to_base64(binary_data):
                if binary_data:
                    return base64.b64encode(binary_data).decode('utf-8')
                return ''

            canvas_data = []

            for vision in opthalmology_visions:
                canvas_data.append({
                    'id':vision.S_No,
                    'AntSegOD': convert_to_base64(vision.AntSegOD),
                    'AntSegOS': convert_to_base64(vision.AntSegOS),
                    'LensOD': convert_to_base64(vision.LensOD),
                    'LensOS': convert_to_base64(vision.LensOS),
                    'FundusOD': convert_to_base64(vision.FundusOD),
                    'FundusOS': convert_to_base64(vision.FundusOS),
                })

            return JsonResponse({'canvasData': canvas_data})
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)

    return JsonResponse({'error': 'Method not allowed'}, status=405)




def decode_base64(base64_data):
    if not base64_data or isinstance(base64_data, dict):
        return None
    try:
        format, imgstr = base64_data.split(';base64,')
        return base64.b64decode(imgstr)
    except Exception as e:
        print(f"Error processing base64 data: {e}")
        return None



# @csrf_exempt
# @require_http_methods(["POST", "GET"])
# def Workbench_Opthalmology_Details(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
#             # print(data, 'data')

#             # Extract data
#             PGPODSph = data.get('PGPODSph', '')
#             PGPODCyl = data.get('PGPODCyl', '')
#             PGPODAxs = data.get('PGPODAxs', '')
#             PGPOsSph = data.get('PGPOsSph', '')
#             PGPOsCyl = data.get('PGPOsCyl', '')
#             PGPOsAxs = data.get('PGPOsAxs', '')
#             ODadd = data.get('ODadd', '')
#             OSadd = data.get('OSadd', '')

#             chiefComplaints = data.get('chiefComplaints', '')
#             history = data.get('history', '')

#             ARODSph = data.get('ARODSph', '')
#             ARODCyl = data.get('ARODCyl', '')
#             ARODAxs = data.get('ARODAxs', '')
#             AROsSph = data.get('AROsSph', '')
#             AROsCyl = data.get('AROsCyl', '')
#             AROsAxs = data.get('AROsAxs', '')

#             powerODVision = data.get('powerODVision', '')
#             powerOSVision = data.get('powerOSVision', '')
#             crxODVision = data.get('crxODVision', '')
#             crxOSVision = data.get('crxOSVision', '')
#             cphODVision = data.get('cphODVision', '')
#             cphOSVision = data.get('cphOSVision', '')

#             SubODSph = data.get('SubODSph', '')
#             SubODCyl = data.get('SubODCyl', '')
#             SubODAxs = data.get('SubODAxs', '')
#             SubODVa = data.get('SubODVa', '')
#             SubOsSph = data.get('SubOsSph', '')
#             SubOsCyl = data.get('SubOsCyl', '')
#             SubOsAxs = data.get('SubOsAxs', '')
#             SubOsVa = data.get('SubOsVa', '')
#             SubODadd = data.get('SubODadd', '')
#             SubOSadd = data.get('SubOSadd', '')

#             DilODSph = data.get('DilODSph', '')
#             DilODCyl = data.get('DilODCyl', '')
#             DilODAxs = data.get('DilODAxs', '')
#             DilOsSph = data.get('DilOsSph', '')
#             DilOsCyl = data.get('DilOsCyl', '')
#             DilOsAxs = data.get('DilOsAxs', '')

#             DilAccODSph = data.get('DilAccODSph', '')
#             DilAccODCyl = data.get('DilAccODCyl', '')
#             DilAccODAxs = data.get('DilAccODAxs', '')
#             DilAccODVa = data.get('DilAccODVa', '')
#             DilAccOSSph = data.get('DilAccOSSph', '')
#             DilAccOSCyl = data.get('DilAccOSCyl', '')
#             DilAccOSAxs = data.get('DilAccOSAxs', '')
#             DilAccOSVa = data.get('DilAccOSVa', '')

#             AntSegOD = data.get('AntSegOD', '')
#             AntSegOS = data.get('AntSegOS', '')
#             LensOD = data.get('LensOD', '')
#             LensOS = data.get('LensOS', '')
#             FundusOD = data.get('FundusOD', '')
#             FundusOS = data.get('FundusOS', '')

#             Atiop = data.get('ATIOP', '')
#             Nctiop = data.get('NCTIOP', '')
#             Osatiop = data.get('OSATIOP', '')
#             Osnctiop = data.get('OSNCTIOP', '')

#             SacSyringing = data.get('SacSyringing', '')
#             SacSyringingSecond = data.get('SacSyringingSecond', '')

#             SubODDiagnosis = data.get('SubODDiagnosis', '')
#             SubOSDiagnosis = data.get('SubOSDiagnosis', '')
#             Treatment = data.get('Treatment', '')
#             followUp = data.get('followUp', '')

#             rightSPH = data.get('rightSPH', '')
#             rightCYL = data.get('rightCYL', '')
#             rightAXIS = data.get('rightAXIS', '')
#             rightVA = data.get('rightVA', '')
#             leftSPH = data.get('leftSPH', '')
#             leftCYL = data.get('leftCYL', '')
#             leftAXIS = data.get('leftAXIS', '')
#             leftVA = data.get('leftVA', '')

#             rightNearSPH = data.get('rightNearSPH', '')
#             rightNearCYL = data.get('rightNearCYL', '')
#             rightNearAXIS = data.get('rightNearAXIS', '')
#             rightNearVA = data.get('rightNearVA', '')
#             leftNearSPH = data.get('leftNearSPH', '')
#             leftNearCYL = data.get('leftNearCYL', '')
#             leftNearAXIS = data.get('leftNearAXIS', '')
#             leftNearVA = data.get('leftNearVA', '')

#             rightPrism = data.get('rightPrism', '')
#             rightPrismValue = data.get('rightPrismValue', '')
#             leftPrism = data.get('leftPrism', '')
#             leftPrismValue = data.get('leftPrismValue', '')
#             rightPrism2 = data.get('rightPrism2', '')
#             rightPrism2Value = data.get('rightPrism2Value', '')
#             leftPrism2 = data.get('leftPrism2', '')
#             leftPrism2Value = data.get('leftPrism2Value', '')
#             drainsData2 = data.get('drainsData2', [])
            
#             # canvasDrawings = data.get('canvasDrawings', {})

#             # print(canvasDrawings,'canvasDrawings')

#             remarks = data.get('remarks', '')
#             PatientId = data.get('PatientId', '')
#             PatientName = data.get('PatientName', '')
#             created_by = data.get('created_by', '')

#            # Save Workbench_Opthalmology instance only once
           
#             # Print the data for debugging
#             print(drainsData2, 'drainsData2')

#             # Save Workbench_Opthalmology Vision instances
#             for arrayData in drainsData2:
#                 print(arrayData, 'arrayData')

#                 Opthalmology_instance = Workbench_Opthalmology(
#                     rightSPH=arrayData.get('rightSPH'),
#                     rightCYL=arrayData.get('rightCYL'),
#                     rightAXIS=arrayData.get('rightAXIS'),
#                     rightVA=arrayData.get('rightVA'),
#                     leftSPH=arrayData.get('leftSPH'),
#                     leftCYL=arrayData.get('leftCYL'),
#                     leftAXIS=arrayData.get('leftAXIS'),
#                     leftVA=arrayData.get('leftVA'),
#                     rightNearSPH=arrayData.get('rightNearSPH'),
#                     rightNearCYL=arrayData.get('rightNearCYL'),
#                     rightNearAXIS=arrayData.get('rightNearAXIS'),
#                     rightNearVA=arrayData.get('rightNearVA'),
#                     leftNearSPH=arrayData.get('leftNearSPH'),
#                     leftNearCYL=arrayData.get('leftNearCYL'),
#                     leftNearAXIS=arrayData.get('leftNearAXIS'),
#                     leftNearVA=arrayData.get('leftNearVA'),
#                     rightPrism=arrayData.get('rightPrism'),
#                     rightPrismValue=arrayData.get('rightPrismValue'),
#                     leftPrism=arrayData.get('leftPrism'),
#                     leftPrismValue=arrayData.get('leftPrismValue'),
#                     rightPrism2=arrayData.get('rightPrism2'),
#                     rightPrism2Value=arrayData.get('rightPrism2Value'),
#                     leftPrism2=arrayData.get('leftPrism2'),
#                     leftPrism2Value=arrayData.get('leftPrism2Value'),
#                     PatientId=PatientId,
#                     PatientName=PatientName,
#                     PGPODSph=PGPODSph,
#                     PGPODCyl=PGPODCyl,
#                     PGPODAxs=PGPODAxs,
#                     PGPOsSph=PGPOsSph,
#                     PGPOsCyl=PGPOsCyl,
#                     PGPOsAxs=PGPOsAxs,
#                     ODadd=ODadd,
#                     OSadd=OSadd,
#                     chiefComplaints=chiefComplaints,
#                     history=history,
#                     ARODSph=ARODSph,
#                     ARODCyl=ARODCyl,
#                     ARODAxs=ARODAxs,
#                     AROsSph=AROsSph,
#                     AROsCyl=AROsCyl,
#                     AROsAxs=AROsAxs,
#                     powerODVision=powerODVision,
#                     powerOSVision=powerOSVision,
#                     crxODVision=crxODVision,
#                     crxOSVision=crxOSVision,
#                     cphODVision=cphODVision,
#                     cphOSVision=cphOSVision,
#                     SubODSph=SubODSph,
#                     SubODCyl=SubODCyl,
#                     SubODAxs=SubODAxs,
#                     SubODVa=SubODVa,
#                     SubOsSph=SubOsSph,
#                     SubOsCyl=SubOsCyl,
#                     SubOsAxs=SubOsAxs,
#                     SubOsVa=SubOsVa,
#                     SubODadd=SubODadd,
#                     SubOSadd=SubOSadd,
#                     DilODSph=DilODSph,
#                     DilODCyl=DilODCyl,
#                     DilODAxs=DilODAxs,
#                     DilOsSph=DilOsSph,
#                     DilOsCyl=DilOsCyl,
#                     DilOsAxs=DilOsAxs,
#                     DilAccODSph=DilAccODSph,
#                     DilAccODCyl=DilAccODCyl,
#                     DilAccODAxs=DilAccODAxs,
#                     DilAccODVa=DilAccODVa,
#                     DilAccOSSph=DilAccOSSph,
#                     DilAccOSCyl=DilAccOSCyl,
#                     DilAccOSAxs=DilAccOSAxs,
#                     DilAccOSVa=DilAccOSVa,
#                     ATIOP=Atiop,
#                     NCTIOP=Nctiop,
#                     OSATIOP=Osatiop,
#                     OSNCTIOP=Osnctiop,
#                     SacSyringing=SacSyringing,
#                     SacSyringingSecond=SacSyringingSecond,
#                     SubODDiagnosis=SubODDiagnosis,
#                     SubOSDiagnosis=SubOSDiagnosis,
#                     Treatment=Treatment,
#                     followUp=followUp,
#                     remarks=remarks,
#                     created_by=created_by
#                     )
#                 Opthalmology_instance.save()

                
            
#             canvas_drawings = {
#             'antSegOD': data.get('antSegOD', ''),
#             'antSegOS': data.get('antSegOS', ''),
#             'lensOD': data.get('lensOD', ''),
#             'lensOS': data.get('lensOS', ''),
#             'fundusOD': data.get('fundusOD', ''),
#             'fundusOS': data.get('fundusOS', '')
#             }

#             vision_draw_instance = Workbench_Opthalmology_VisionDraw(
#             Id=Opthalmology_instance,
#             PatientId=data.get('PatientId'),
#             PatientName=data.get('PatientName'),
#             created_by=data.get('created_by')
#             )

#             # Save images from base64 data
#             vision_draw_instance.save(canvas_drawings=canvas_drawings)

            
           

#             return JsonResponse({'success': 'Opthalmology Details added successfully'})

#         except Exception as e:
#             print(f"An error occurred: {str(e)}")
#             return JsonResponse({'error': 'An internal server error occurred'}, status=500)

#     elif request.method == 'GET':
#         try:
#             Opthalmologies = Workbench_Opthalmology.objects.all()
#             Opthalmologies_vision = Workbench_Opthalmology_VisionDraw.objects.all()

#             Opthalmology_Data = [

#                 {
#                     'id': Optho.Id,
#                     'PatientId': Optho.PatientId,
#                     'PatientName': Optho.PatientName,
#                     'PGPODSph': Optho.PGPODSph,
#                     'PGPODCyl': Optho.PGPODCyl,
#                     'PGPODAxs': Optho.PGPODAxs,
#                     'PGPOsSph': Optho.PGPOsSph,
#                     'PGPOsCyl': Optho.PGPOsCyl,
#                     'PGPOsAxs': Optho.PGPOsAxs,
#                     'ODadd': Optho.ODadd,
#                     'OSadd': Optho.OSadd,
#                     'chiefComplaints': Optho.chiefComplaints,
#                     'history': Optho.history,
#                     'ARODSph': Optho.ARODSph,
#                     'ARODCyl': Optho.ARODCyl,
#                     'ARODAxs': Optho.ARODAxs,
#                     'AROsSph': Optho.AROsSph,
#                     'AROsCyl': Optho.AROsCyl,
#                     'AROsAxs': Optho.AROsAxs,
#                     'powerODVision': Optho.powerODVision,
#                     'powerOSVision': Optho.powerOSVision,
#                     'crxODVision': Optho.crxODVision,
#                     'crxOSVision': Optho.crxOSVision,
#                     'cphODVision': Optho.cphODVision,
#                     'cphOSVision': Optho.cphOSVision,
#                     'SubODSph': Optho.SubODSph,
#                     'SubODCyl': Optho.SubODCyl,
#                     'SubODAxs': Optho.SubODAxs,
#                     'SubODVa': Optho.SubODVa,
#                     'SubOsSph': Optho.SubOsSph,
#                     'SubOsCyl': Optho.SubOsCyl,
#                     'SubOsAxs': Optho.SubOsAxs,
#                     'SubOsVa': Optho.SubOsVa,
#                     'SubODadd': Optho.SubODadd,
#                     'SubOSadd': Optho.SubOSadd,
#                     'DilODSph': Optho.DilODSph,
#                     'DilODCyl': Optho.DilODCyl,
#                     'DilODAxs': Optho.DilODAxs,
#                     'DilOsSph': Optho.DilOsSph,
#                     'DilOsCyl': Optho.DilOsCyl,
#                     'DilOsAxs': Optho.DilOsAxs,
#                     'DilAccODSph': Optho.DilAccODSph,
#                     'DilAccODCyl': Optho.DilAccODCyl,
#                     'DilAccODAxs': Optho.DilAccODAxs,
#                     'DilAccODVa': Optho.DilAccODVa,
#                     'DilAccOSSph': Optho.DilAccOSSph,
#                     'DilAccOSCyl': Optho.DilAccOSCyl,
#                     'DilAccOSAxs': Optho.DilAccOSAxs,
#                     'DilAccOSVa': Optho.DilAccOSVa,
                    
#                     'Atiop': Optho.ATIOP,
#                     'Nctiop': Optho.NCTIOP,
#                     'Osatiop': Optho.OSATIOP,
#                     'Osnctiop': Optho.OSNCTIOP,
#                     'SacSyringing': Optho.SacSyringing,
#                     'SacSyringingSecond': Optho.SacSyringingSecond,
#                     'SubODDiagnosis': Optho.SubODDiagnosis,
#                     'SubOSDiagnosis': Optho.SubOSDiagnosis,
#                     'Treatment': Optho.Treatment,
#                     'followUp': Optho.followUp,
                    
#                     'remarks': Optho.remarks,

#                     'rightSPH': Optho.rightSPH,
#                     'rightCYL': Optho.rightCYL,
#                     'rightAXIS': Optho.rightAXIS,
#                     'rightVA': Optho.rightVA,
#                     'leftSPH': Optho.leftSPH,
#                     'leftCYL': Optho.leftCYL,
#                     'leftAXIS': Optho.leftAXIS,
#                     'leftVA': Optho.leftVA,

#                     'rightNearSPH': Optho.rightNearSPH,
#                     'rightNearCYL': Optho.rightNearCYL,
#                     'rightNearAXIS': Optho.rightNearAXIS,
#                     'rightNearVA': Optho.rightNearVA,
#                     'leftNearSPH': Optho.leftNearSPH,
#                     'leftNearCYL': Optho.leftNearCYL,
#                     'leftNearAXIS': Optho.leftNearAXIS,
#                     'leftNearVA': Optho.leftNearVA,

#                     'rightPrism': Optho.rightPrism,
#                     'rightPrismValue': Optho.rightPrismValue,
#                     'leftPrism': Optho.leftPrism,
#                     'leftPrismValue': Optho.leftPrismValue,

#                     'rightPrism2': Optho.rightPrism2,
#                     'rightPrism2Value': Optho.rightPrism2Value,
                    
#                     'leftPrism2': Optho.leftPrism2,
#                     'leftPrism2Value': Optho.leftPrism2Value,
#                     'created_by': Optho.created_by,
#                     'Date': Optho.created_at.strftime('%Y-%m-%d'),
#                     'Time': Optho.created_at.strftime('%H:%M:%S'),
#                 } for Optho in Opthalmologies
#             ]
            

            
           
#             Opthalmology_Vision_Data = [
#                     {
#                         'id': OpthoVision.S_No,
#                         'PatientId': OpthoVision.PatientId,
#                         'PatientName': OpthoVision.PatientName,
#                         'AntSegOD': OpthoVision.AntSegOD.url if OpthoVision.AntSegOD else None,
#                         'AntSegOS': OpthoVision.AntSegOS.url if OpthoVision.AntSegOS else None,
#                         'LensOD': OpthoVision.LensOD.url if OpthoVision.LensOD else None,
#                         'LensOS': OpthoVision.LensOS.url if OpthoVision.LensOS else None,
#                         'FundusOD': OpthoVision.FundusOD.url if OpthoVision.FundusOD else None,
#                         'FundusOS': OpthoVision.FundusOS.url if OpthoVision.FundusOS else None,
#                         'created_by': OpthoVision.created_by,
#                         'Date': OpthoVision.created_at.strftime('%Y-%m-%d'),
#                         'Time': OpthoVision.created_at.strftime('%H:%M:%S'),
#                     } for OpthoVision in Opthalmologies_vision
#                 ]

#             return JsonResponse({
#                 'Opthalmology_Data': Opthalmology_Data,
#                 'Opthalmology_Vision_Data': Opthalmology_Vision_Data,
#             })

#         except Exception as e:
#             print(f"An error occurred: {str(e)}")
#             return JsonResponse({'error': 'An internal server error occurred'}, status=500)

#     return JsonResponse({'error': 'Method not allowed'}, status=405)



# @csrf_exempt
# @require_http_methods(["POST", "GET"])
# def Workbench_Opthalmology_Details(request):
#     if request.method == 'POST':
#         try:
#             data = json.loads(request.body)
#             # print(data, 'data')

#             # Extract data
#             PGPODSph = data.get('PGPODSph', '')
#             PGPODCyl = data.get('PGPODCyl', '')
#             PGPODAxs = data.get('PGPODAxs', '')
#             PGPOsSph = data.get('PGPOsSph', '')
#             PGPOsCyl = data.get('PGPOsCyl', '')
#             PGPOsAxs = data.get('PGPOsAxs', '')
#             ODadd = data.get('ODadd', '')
#             OSadd = data.get('OSadd', '')

#             chiefComplaints = data.get('chiefComplaints', '')
#             history = data.get('history', '')

#             ARODSph = data.get('ARODSph', '')
#             ARODCyl = data.get('ARODCyl', '')
#             ARODAxs = data.get('ARODAxs', '')
#             AROsSph = data.get('AROsSph', '')
#             AROsCyl = data.get('AROsCyl', '')
#             AROsAxs = data.get('AROsAxs', '')

#             powerODVision = data.get('powerODVision', '')
#             powerOSVision = data.get('powerOSVision', '')
#             crxODVision = data.get('crxODVision', '')
#             crxOSVision = data.get('crxOSVision', '')
#             cphODVision = data.get('cphODVision', '')
#             cphOSVision = data.get('cphOSVision', '')

#             SubODSph = data.get('SubODSph', '')
#             SubODCyl = data.get('SubODCyl', '')
#             SubODAxs = data.get('SubODAxs', '')
#             SubODVa = data.get('SubODVa', '')
#             SubOsSph = data.get('SubOsSph', '')
#             SubOsCyl = data.get('SubOsCyl', '')
#             SubOsAxs = data.get('SubOsAxs', '')
#             SubOsVa = data.get('SubOsVa', '')
#             SubODadd = data.get('SubODadd', '')
#             SubOSadd = data.get('SubOSadd', '')

#             DilODSph = data.get('DilODSph', '')
#             DilODCyl = data.get('DilODCyl', '')
#             DilODAxs = data.get('DilODAxs', '')
#             DilOsSph = data.get('DilOsSph', '')
#             DilOsCyl = data.get('DilOsCyl', '')
#             DilOsAxs = data.get('DilOsAxs', '')

#             DilAccODSph = data.get('DilAccODSph', '')
#             DilAccODCyl = data.get('DilAccODCyl', '')
#             DilAccODAxs = data.get('DilAccODAxs', '')
#             DilAccODVa = data.get('DilAccODVa', '')
#             DilAccOSSph = data.get('DilAccOSSph', '')
#             DilAccOSCyl = data.get('DilAccOSCyl', '')
#             DilAccOSAxs = data.get('DilAccOSAxs', '')
#             DilAccOSVa = data.get('DilAccOSVa', '')

#             AntSegOD = data.get('AntSegOD', '')
#             AntSegOS = data.get('AntSegOS', '')
#             LensOD = data.get('LensOD', '')
#             LensOS = data.get('LensOS', '')
#             FundusOD = data.get('FundusOD', '')
#             FundusOS = data.get('FundusOS', '')

#             Atiop = data.get('ATIOP', '')
#             Nctiop = data.get('NCTIOP', '')
#             Osatiop = data.get('OSATIOP', '')
#             Osnctiop = data.get('OSNCTIOP', '')

#             SacSyringing = data.get('SacSyringing', '')
#             SacSyringingSecond = data.get('SacSyringingSecond', '')

#             SubODDiagnosis = data.get('SubODDiagnosis', '')
#             SubOSDiagnosis = data.get('SubOSDiagnosis', '')
#             Treatment = data.get('Treatment', '')
#             followUp = data.get('followUp', '')

#             rightSPH = data.get('rightSPH', '')
#             rightCYL = data.get('rightCYL', '')
#             rightAXIS = data.get('rightAXIS', '')
#             rightVA = data.get('rightVA', '')
#             leftSPH = data.get('leftSPH', '')
#             leftCYL = data.get('leftCYL', '')
#             leftAXIS = data.get('leftAXIS', '')
#             leftVA = data.get('leftVA', '')

#             rightNearSPH = data.get('rightNearSPH', '')
#             rightNearCYL = data.get('rightNearCYL', '')
#             rightNearAXIS = data.get('rightNearAXIS', '')
#             rightNearVA = data.get('rightNearVA', '')
#             leftNearSPH = data.get('leftNearSPH', '')
#             leftNearCYL = data.get('leftNearCYL', '')
#             leftNearAXIS = data.get('leftNearAXIS', '')
#             leftNearVA = data.get('leftNearVA', '')

#             rightPrism = data.get('rightPrism', '')
#             rightPrismValue = data.get('rightPrismValue', '')
#             leftPrism = data.get('leftPrism', '')
#             leftPrismValue = data.get('leftPrismValue', '')
#             rightPrism2 = data.get('rightPrism2', '')
#             rightPrism2Value = data.get('rightPrism2Value', '')
#             leftPrism2 = data.get('leftPrism2', '')
#             leftPrism2Value = data.get('leftPrism2Value', '')
#             drainsData2 = data.get('drainsData2', [])
#             canvasDrawings = data.get('canvasDrawings', {})

#             print(canvasDrawings,'canvasDrawings')

#             remarks = data.get('remarks', '')
#             PatientId = data.get('PatientId', '')
#             PatientName = data.get('PatientName', '')
#             created_by = data.get('created_by', '')

#            # Save Workbench_Opthalmology instance only once
           
#             # Print the data for debugging
#             print(drainsData2, 'drainsData2')

#             # Save Workbench_Opthalmology Vision instances
#             for arrayData in drainsData2:
#                 print(arrayData, 'arrayData')

#                 Opthalmology_instance = Workbench_Opthalmology(
#                     rightSPH=arrayData.get('rightSPH'),
#                     rightCYL=arrayData.get('rightCYL'),
#                     rightAXIS=arrayData.get('rightAXIS'),
#                     rightVA=arrayData.get('rightVA'),
#                     leftSPH=arrayData.get('leftSPH'),
#                     leftCYL=arrayData.get('leftCYL'),
#                     leftAXIS=arrayData.get('leftAXIS'),
#                     leftVA=arrayData.get('leftVA'),
#                     rightNearSPH=arrayData.get('rightNearSPH'),
#                     rightNearCYL=arrayData.get('rightNearCYL'),
#                     rightNearAXIS=arrayData.get('rightNearAXIS'),
#                     rightNearVA=arrayData.get('rightNearVA'),
#                     leftNearSPH=arrayData.get('leftNearSPH'),
#                     leftNearCYL=arrayData.get('leftNearCYL'),
#                     leftNearAXIS=arrayData.get('leftNearAXIS'),
#                     leftNearVA=arrayData.get('leftNearVA'),
#                     rightPrism=arrayData.get('rightPrism'),
#                     rightPrismValue=arrayData.get('rightPrismValue'),
#                     leftPrism=arrayData.get('leftPrism'),
#                     leftPrismValue=arrayData.get('leftPrismValue'),
#                     rightPrism2=arrayData.get('rightPrism2'),
#                     rightPrism2Value=arrayData.get('rightPrism2Value'),
#                     leftPrism2=arrayData.get('leftPrism2'),
#                     leftPrism2Value=arrayData.get('leftPrism2Value'),
#                     PatientId=PatientId,
#                 PatientName=PatientName,
#                 PGPODSph=PGPODSph,
#                 PGPODCyl=PGPODCyl,
#                 PGPODAxs=PGPODAxs,
#                 PGPOsSph=PGPOsSph,
#                 PGPOsCyl=PGPOsCyl,
#                 PGPOsAxs=PGPOsAxs,
#                 ODadd=ODadd,
#                 OSadd=OSadd,
#                 chiefComplaints=chiefComplaints,
#                 history=history,
#                 ARODSph=ARODSph,
#                 ARODCyl=ARODCyl,
#                 ARODAxs=ARODAxs,
#                 AROsSph=AROsSph,
#                 AROsCyl=AROsCyl,
#                 AROsAxs=AROsAxs,
#                 powerODVision=powerODVision,
#                 powerOSVision=powerOSVision,
#                 crxODVision=crxODVision,
#                 crxOSVision=crxOSVision,
#                 cphODVision=cphODVision,
#                 cphOSVision=cphOSVision,
#                 SubODSph=SubODSph,
#                 SubODCyl=SubODCyl,
#                 SubODAxs=SubODAxs,
#                 SubODVa=SubODVa,
#                 SubOsSph=SubOsSph,
#                 SubOsCyl=SubOsCyl,
#                 SubOsAxs=SubOsAxs,
#                 SubOsVa=SubOsVa,
#                 SubODadd=SubODadd,
#                 SubOSadd=SubOSadd,
#                 DilODSph=DilODSph,
#                 DilODCyl=DilODCyl,
#                 DilODAxs=DilODAxs,
#                 DilOsSph=DilOsSph,
#                 DilOsCyl=DilOsCyl,
#                 DilOsAxs=DilOsAxs,
#                 DilAccODSph=DilAccODSph,
#                 DilAccODCyl=DilAccODCyl,
#                 DilAccODAxs=DilAccODAxs,
#                 DilAccODVa=DilAccODVa,
#                 DilAccOSSph=DilAccOSSph,
#                 DilAccOSCyl=DilAccOSCyl,
#                 DilAccOSAxs=DilAccOSAxs,
#                 DilAccOSVa=DilAccOSVa,
#                 ATIOP=Atiop,
#                 NCTIOP=Nctiop,
#                 OSATIOP=Osatiop,
#                 OSNCTIOP=Osnctiop,
#                 SacSyringing=SacSyringing,
#                 SacSyringingSecond=SacSyringingSecond,
#                 SubODDiagnosis=SubODDiagnosis,
#                 SubOSDiagnosis=SubOSDiagnosis,
#                 Treatment=Treatment,
#                 followUp=followUp,
#                 remarks=remarks,
#                 created_by=created_by
#                 )
#                 Opthalmology_instance.save()

                

            
#             # Opthalmology_instance = Workbench_Opthalmology(
                
#             # )
#             # Opthalmology_instance.save()
    

           
           
#             # Save Workbench_Opthalmology_VisionDraw instance
#             Opthalmology_Vision_Draw_instance = Workbench_Opthalmology_VisionDraw(
#                 Id=Opthalmology_instance,
#                 PatientId=PatientId,
#                 PatientName=PatientName,
#                 AntSegOD=AntSegOD,
#                 AntSegOS=AntSegOS,
#                 LensOD=LensOD,
#                 LensOS=LensOS,
#                 FundusOD=FundusOD,
#                 FundusOS=FundusOS,
#                 created_by=created_by
#             )
#             Opthalmology_Vision_Draw_instance.save()


#             return JsonResponse({'success': 'Opthalmology Details added successfully'})

#         except Exception as e:
#             print(f"An error occurred: {str(e)}")
#             return JsonResponse({'error': 'An internal server error occurred'}, status=500)

#     elif request.method == 'GET':
#         try:
#             Opthalmologies = Workbench_Opthalmology.objects.all()
#             Opthalmologies_vision = Workbench_Opthalmology_VisionDraw.objects.all()

#             Opthalmology_Data = [
#                 {
#                     'id': Optho.Id,
#                     'PatientId': Optho.PatientId,
#                     'PatientName': Optho.PatientName,
#                     'PGPODSph': Optho.PGPODSph,
#                     'PGPODCyl': Optho.PGPODCyl,
#                     'PGPODAxs': Optho.PGPODAxs,
#                     'PGPOsSph': Optho.PGPOsSph,
#                     'PGPOsCyl': Optho.PGPOsCyl,
#                     'PGPOsAxs': Optho.PGPOsAxs,
#                     'ODadd': Optho.ODadd,
#                     'OSadd': Optho.OSadd,
#                     'chiefComplaints': Optho.chiefComplaints,
#                     'history': Optho.history,
#                     'ARODSph': Optho.ARODSph,
#                     'ARODCyl': Optho.ARODCyl,
#                     'ARODAxs': Optho.ARODAxs,
#                     'AROsSph': Optho.AROsSph,
#                     'AROsCyl': Optho.AROsCyl,
#                     'AROsAxs': Optho.AROsAxs,
#                     'powerODVision': Optho.powerODVision,
#                     'powerOSVision': Optho.powerOSVision,
#                     'crxODVision': Optho.crxODVision,
#                     'crxOSVision': Optho.crxOSVision,
#                     'cphODVision': Optho.cphODVision,
#                     'cphOSVision': Optho.cphOSVision,
#                     'SubODSph': Optho.SubODSph,
#                     'SubODCyl': Optho.SubODCyl,
#                     'SubODAxs': Optho.SubODAxs,
#                     'SubODVa': Optho.SubODVa,
#                     'SubOsSph': Optho.SubOsSph,
#                     'SubOsCyl': Optho.SubOsCyl,
#                     'SubOsAxs': Optho.SubOsAxs,
#                     'SubOsVa': Optho.SubOsVa,
#                     'SubODadd': Optho.SubODadd,
#                     'SubOSadd': Optho.SubOSadd,
#                     'DilODSph': Optho.DilODSph,
#                     'DilODCyl': Optho.DilODCyl,
#                     'DilODAxs': Optho.DilODAxs,
#                     'DilOsSph': Optho.DilOsSph,
#                     'DilOsCyl': Optho.DilOsCyl,
#                     'DilOsAxs': Optho.DilOsAxs,
#                     'DilAccODSph': Optho.DilAccODSph,
#                     'DilAccODCyl': Optho.DilAccODCyl,
#                     'DilAccODAxs': Optho.DilAccODAxs,
#                     'DilAccODVa': Optho.DilAccODVa,
#                     'DilAccOSSph': Optho.DilAccOSSph,
#                     'DilAccOSCyl': Optho.DilAccOSCyl,
#                     'DilAccOSAxs': Optho.DilAccOSAxs,
#                     'DilAccOSVa': Optho.DilAccOSVa,
#                     'ATIOP': Optho.ATIOP,
#                     'NCTIOP': Optho.NCTIOP,
#                     'OSATIOP': Optho.OSATIOP,
#                     'OSNCTIOP': Optho.OSNCTIOP,
#                     'SacSyringing': Optho.SacSyringing,
#                     'SacSyringingSecond': Optho.SacSyringingSecond,
#                     'SubODDiagnosis': Optho.SubODDiagnosis,
#                     'SubOSDiagnosis': Optho.SubOSDiagnosis,
#                     'Treatment': Optho.Treatment,
#                     'followUp': Optho.followUp,
                    
#                     'remarks': Optho.remarks,
#                     'created_by': Optho.created_by,
#                     'Date': Optho.created_at.strftime('%Y-%m-%d'),
#                     'Time': Optho.created_at.strftime('%H:%M:%S'),
#                 } for Optho in Opthalmologies
#             ]
            

#             Opthalmology_Array_Data =[
#                 {
#                     'rightSPH': Optho.rightSPH,
#                     'rightCYL': Optho.rightCYL,
#                     'rightAXIS': Optho.rightAXIS,
#                     'rightVA': Optho.rightVA,
#                     'leftSPH': Optho.leftSPH,
#                     'leftCYL': Optho.leftCYL,
#                     'leftAXIS': Optho.leftAXIS,
#                     'leftVA': Optho.leftVA,
#                     'rightNearSPH': Optho.rightNearSPH,
#                     'rightNearCYL': Optho.rightNearCYL,
#                     'rightNearAXIS': Optho.rightNearAXIS,
#                     'rightNearVA': Optho.rightNearVA,
#                     'leftNearSPH': Optho.leftNearSPH,
#                     'leftNearCYL': Optho.leftNearCYL,
#                     'leftNearAXIS': Optho.leftNearAXIS,
#                     'leftNearVA': Optho.leftNearVA,
#                     'rightPrism': Optho.rightPrism,
#                     'rightPrismValue': Optho.rightPrismValue,
#                     'leftPrism': Optho.leftPrism,
#                     'leftPrismValue': Optho.leftPrismValue,
#                     'rightPrism2': Optho.rightPrism2,
#                     'rightPrism2Value': Optho.rightPrism2Value,
#                     'leftPrism2': Optho.leftPrism2,
#                     'leftPrism2Value': Optho.leftPrism2Value,

#                 } for Optho in Opthalmologies
#             ]
           
#             Opthalmology_Vision_Data = [
#                 {
#                     'id': OpthoVision.S_No,
#                     'PatientId': OpthoVision.PatientId,
#                     'PatientName': OpthoVision.PatientName,
#                     'AntSegOD': OpthoVision.AntSegOD,
#                     'AntSegOS': OpthoVision.AntSegOS,
#                     'LensOD': OpthoVision.LensOD,
#                     'LensOS': OpthoVision.LensOS,
#                     'FundusOD': OpthoVision.FundusOD,
#                     'FundusOS': OpthoVision.FundusOS,
#                     'created_by': OpthoVision.created_by,
#                     'Date': OpthoVision.created_at.strftime('%Y-%m-%d'),
#                     'Time': OpthoVision.created_at.strftime('%H:%M:%S'),
#                 } for OpthoVision in Opthalmologies_vision
#             ]

#             return JsonResponse({
#                 'Opthalmology_Data': Opthalmology_Data,
#                 'Opthalmology_Vision_Data': Opthalmology_Vision_Data,
#                 'Opthalmology_Array_Data': Opthalmology_Array_Data
#             })

#         except Exception as e:
#             print(f"An error occurred: {str(e)}")
#             return JsonResponse({'error': 'An internal server error occurred'}, status=500)

#     return JsonResponse({'error': 'Method not allowed'}, status=405)










































