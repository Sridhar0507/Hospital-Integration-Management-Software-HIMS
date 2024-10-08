from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from .models import *
import json



@csrf_exempt
@require_http_methods(["POST", "OPTIONS", "GET"])
def Workbench_Neurology_Details(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            
            print(data,'data----------------')
            # Extract and validate data
            History = data.get('History','')
            PastInvestigations = data.get('PastInvestigations','')
            Examination = data.get('Examination','')
            GeneralExam = data.get('GeneralExam','')
            Vision = data.get('Vision','')
            Fundus = data.get('Fundus','')
            Fields = data.get('Fields','')
            Eom = data.get('EOM','')
            Pupils = data.get('Pupils','')
            Nerves = data.get('Nerves','')
            LowerCranialNerves = data.get('LowerCranialNerves','')
            SensoryExam = data.get('SensoryExam','')
            InvoluntaryMovements = data.get('InvoluntaryMovements','')
            Fn= data.get('FN','')
            Dysdiadoko = data.get('Dysdiadoko','')
            Tandem = data.get('Tandem','')
            Gait = data.get('Gait','')
            Power = data.get('Power','')
            Neck = data.get('Neck','')
            ShoulderR = data.get('ShoulderR','')
            HipR = data.get('HipR','')
            ElbowR = data.get('ElbowR','')
            KneeR = data.get('KneeR','')
            WristR = data.get('WristR','')
            HandR = data.get('HandR','')
            AnkleR = data.get('AnkleR','')
            ShoulderL = data.get('ShoulderL','')
            HipL = data.get('HipL','')
            ElbowL = data.get('ElbowL','')
            KneeL = data.get('KneeL','')
            WristL = data.get('WristL','')
            HandL = data.get('HandL','')
            AnkleL = data.get('AnkleL','')            
            Rb1 = data.get('RB1','')
            Rt1 = data.get('RT1','')
            Rs1 = data.get('RS1','')
            Rk1 = data.get('RK1','')
            Ra1 = data.get('RA1','')
            RPlantars1 = data.get('RPlantars1','')
            RAbdominals1 = data.get('RAbdominals1','')
            RAbdominals2 = data.get('RAbdominals2','')
            RCr1 = data.get('RCr1','')           
            Lb1 = data.get('LB1','')
            Lt1 = data.get('LT1','')
            Ls1 = data.get('LS1','')
            Lk1 = data.get('LK1','')
            La1 = data.get('LA1','')
            LPlantars1 = data.get('LPlantars1','')
            LAbdominals1 = data.get('LAbdominals1','')
            LAbdominals2 = data.get('LAbdominals2','')
            LCr1 = data.get('LCr1','')          
            # PatientId = data.get('PatientId', '')
            # PatientName = data.get('PatientName', '')
            registration_id = data.get('RegistrationId', '')

            created_by = data.get('created_by', '')

                

            if not registration_id:
                return JsonResponse({'error': 'RegistrationId is required'}, status=400)

            try:
                registration_ins = Patient_Appointment_Registration_Detials.objects.get(pk=registration_id)
            except Patient_Appointment_Registration_Detials.DoesNotExist:
                return JsonResponse({'error': 'Patient not found'}, status=404)
            
            if isinstance(ShoulderR, list) and len(ShoulderR) > 0:
                ShoulderRF = ShoulderR[0]
                ShoulderRE = ShoulderR[1]
                ShoulderRAbd = ShoulderR[2]
                ShoulderRAdd = ShoulderR[3]
            else:
                ShoulderRF = ShoulderRE = ShoulderRAbd = ShoulderRAdd = None  

            if isinstance(ShoulderL, list) and len(ShoulderL) > 0:
                ShoulderLF = ShoulderL[0]
                ShoulderLE = ShoulderL[1]
                ShoulderLAbd = ShoulderL[2]
                ShoulderLAdd = ShoulderL[3]
            else:
                ShoulderLF = ShoulderLE = ShoulderLAbd = ShoulderLAdd = None  

            if isinstance(HipR, list) and len(HipR) > 0:
                HipRF = HipR[0]
                HipRE = HipR[1]
                HipRAbd = HipR[2]
                HipRAdd = HipR[3]
            else:
                HipRF = HipRE = HipRAbd = HipRAdd = None  

            if isinstance(HipL, list) and len(HipL) > 0:
                HipLF = HipL[0]
                HipLE = HipL[1]
                HipLAbd = HipL[2]
                HipLAdd = HipL[3]
            else:
                HipLF = HipLE = HipLAbd = HipLAdd = None  
            
            if isinstance(ElbowR, list) and len(ElbowR) > 0:
                ElbowRF = ElbowR[0]
                ElbowRE = ElbowR[1]
                
            else:
                ElbowRF = ElbowRE  = None  
            
            if isinstance(ElbowL, list) and len(ElbowL) > 0:
                ElbowLF = ElbowL[0]
                ElbowLE = ElbowL[1]
                
            else:
                ElbowLF = ElbowLE  = None  
           
            if isinstance(KneeR, list) and len(KneeR) > 0:
                KneeRF = KneeR[0]
                KneeRE = KneeR[1]
                
            else:
                KneeRF = KneeRE  = None  
            
            if isinstance(KneeL, list) and len(KneeL) > 0:
                KneeLF = KneeR[0]
                KneeLE = KneeR[1]
                
            else:
                KneeLF = KneeLE  = None  
            
            if isinstance(WristR, list) and len(WristR) > 0:
                WristRF = WristR[0]
                WristRE = WristR[1]
                
            else:
                WristRF = WristRE  = None  
            
            if isinstance(WristL, list) and len(WristL) > 0:
                WristLF = WristL[0]
                WristLE = WristL[1]
                
            else:
                WristLF = WristLE  = None  
            
            if isinstance(HandR, list) and len(HandR) > 0:
                HandRI = HandR[0]
                HandRE = HandR[1]
                
            else:
                HandRI = HandRE  = None 

            if isinstance(HandL, list) and len(HandL) > 0:
                HandLI = HandL[0]
                HandLE = HandL[1]
                
            else:
                HandLI = HandLE  = None  
            
            if isinstance(AnkleR, list) and len(AnkleR) > 0:
                AnkleRDF = AnkleR[0]
                AnkleRPF = AnkleR[1]
                AnkleRI = AnkleR[2]
                AnkleRE = AnkleR[3]
                
            else:
                AnkleRDF = AnkleRPF = AnkleRI = AnkleRE = None  
            
            if isinstance(AnkleL, list) and len(AnkleL) > 0:
                AnkleLDF = AnkleL[0]
                AnkleLPF = AnkleL[1]
                AnkleLI = AnkleL[2]
                AnkleLE = AnkleL[3]
                
            else:
                AnkleLDF = AnkleLPF = AnkleLI = AnkleLE = None  


            Neuro_instance = Workbench_Neurology(
                # PatientId=PatientId,
                # PatientName=PatientName,
                Registration_Id=registration_ins,
                History=History,
                PastInvestigations=PastInvestigations,
                Examination=Examination,
                GeneralExam=GeneralExam,
                Vision=Vision,
                Fundus=Fundus,
                Fields=Fields,
                EOM=Eom,
                Pupils=Pupils,
                Nerves=Nerves,
                LowerCranialNerves=LowerCranialNerves,
                SensoryExam=SensoryExam,
                InvoluntaryMovements=InvoluntaryMovements,
                FN=Fn,
                Dysdiadoko=Dysdiadoko,
                Tandem=Tandem,
                Gait=Gait,
                Power=Power,
                Neck=Neck,
                # ShoulderR=ShoulderR,
                ShoulderRF=ShoulderRF,
                ShoulderRE=ShoulderRE,
                ShoulderRAbd=ShoulderRAbd,
                ShoulderRAdd=ShoulderRAdd,
                # HipR=HipR,
                HipRF=HipRF,
                HipRE=HipRE,
                HipRAbd=HipRAbd,
                HipRAdd=HipRAdd,
                # ElbowR=ElbowR,
                ElbowRF=ElbowRF,
                ElbowRE=ElbowRE,
                # KneeR=KneeR,
                KneeRF=KneeRF,
                KneeRE=KneeRE,
                # WristR=WristR,
                WristRF=WristRF,
                WristRE=WristRE,
                # HandR=HandR,
                HandRI=HandRI,
                HandRE=HandRE,
                # AnkleR=AnkleR,
                AnkleRDF=AnkleRDF,
                AnkleRPF=AnkleRPF,
                AnkleRI=AnkleRI,
                AnkleRE=AnkleRE,
                # ShoulderL=ShoulderL,
                ShoulderLF=ShoulderLF,
                ShoulderLE=ShoulderLE,
                ShoulderLAbd=ShoulderLAbd,
                ShoulderLAdd=ShoulderLAdd,
                # HipL=HipL,
                HipLF=HipLF,
                HipLE=HipLE,
                HipLAbd=HipLAbd,
                HipLAdd=HipLAdd,
                # ElbowL=ElbowL,
                ElbowLF=ElbowLF,
                ElbowLE=ElbowLE,
                # KneeL=KneeL,
                KneeLF=KneeLF,
                KneeLE=KneeLE,
                # WristL=WristL,
                WristLF=WristLF,
                WristLE=WristLE,
                # HandL=HandL,
                HandLI=HandLI,
                HandLE=HandLE,
                # AnkleL=AnkleL,
                AnkleLDF=AnkleLDF,
                AnkleLPF=AnkleLPF,
                AnkleLI=AnkleLI,
                AnkleLE=AnkleLE,
                RB1=Rb1,
                RT1=Rt1,
                RS1=Rs1,
                RK1=Rk1,
                RA1=Ra1,
                RPlantars1=RPlantars1,
                RAbdominals1=RAbdominals1,
                RAbdominals2=RAbdominals2,
                RCr1=RCr1,
                LB1=Lb1,
                LT1=Lt1,
                LS1=Ls1,
                LK1=Lk1,
                LA1=La1,
                LPlantars1=LPlantars1,
                LAbdominals1=LAbdominals1,
                LAbdominals2=LAbdominals2,
                LCr1=LCr1,
                created_by=created_by
            )
            Neuro_instance.save()
            return JsonResponse({'success': 'Neuro Details added successfully'})
       
        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
            
   
    elif request.method == 'GET':
        try:

            registration_id = request.GET.get('RegistrationId')
            if not registration_id:
                return JsonResponse({'warn': 'RegistrationId is required'}, status=400)
            
            try:
                registration_ins = Patient_Appointment_Registration_Detials.objects.get(pk=registration_id)
            except Patient_Appointment_Registration_Detials.DoesNotExist:
                return JsonResponse({'error': 'Patient not found'}, status=404)

            # Fetch all records from the Location_Detials model
            Neurology_datas = Workbench_Neurology.objects.filter(Registration_Id=registration_ins)
            
            data=[]
            # Construct a list of dictionaries containing location data
            for Neuro in Neurology_datas:
                data.append({
                    'id': Neuro.Id,
                    'RegistrationId': Neuro.Registration_Id.pk,
                    'VisitId': Neuro.Registration_Id.VisitId,
                    'PrimaryDoctorId': Neuro.Registration_Id.PrimaryDoctor.Doctor_ID,
                    'PrimaryDoctorName': Neuro.Registration_Id.PrimaryDoctor.ShortName,
                    'History': Neuro.History,
                    'PastInvestigations': Neuro.PastInvestigations,
                    'Examination': Neuro.Examination,
                    'GeneralExam': Neuro.GeneralExam,
                    'Vision': Neuro.Vision,
                    'Fundus': Neuro.Fundus,
                    'Fields': Neuro.Fields,
                    'Eom': Neuro.EOM,
                    'Pupils': Neuro.Pupils,
                    'Nerves': Neuro.Nerves,
                    'LowerCranialNerves': Neuro.LowerCranialNerves,
                    'SensoryExam': Neuro.SensoryExam,
                    'InvoluntaryMovements': Neuro.InvoluntaryMovements,
                    'Fn': Neuro.FN,
                    'Dysdiadoko': Neuro.Dysdiadoko,
                    'Tandem': Neuro.Tandem,
                    'Gait': Neuro.Gait,
                    'Power': Neuro.Power,
                    'Neck': Neuro.Neck,

                    # 'ShoulderR': Neuro.ShoulderR,
                    'ShoulderRF': Neuro.ShoulderRF,
                    'ShoulderRE': Neuro.ShoulderRE,
                    'ShoulderRAbd': Neuro.ShoulderRAbd,
                    'ShoulderRAdd': Neuro.ShoulderRAdd,
                    
                    # 'HipR': Neuro.HipR,
                    'HipRF': Neuro.HipRF,
                    'HipRE': Neuro.HipRE,
                    'HipRAbd': Neuro.HipRAbd,
                    'HipRAdd': Neuro.HipRAdd,
                    
                    # 'ElbowR': Neuro.ElbowR,
                    'ElbowRF': Neuro.ElbowRF,
                    'ElbowRE': Neuro.ElbowRE,

                    # 'KneeR': Neuro.KneeR,
                    'KneeRF': Neuro.KneeRF,
                    'KneeRE': Neuro.KneeRE,

                    # 'WristR': Neuro.WristR,
                    'WristRF': Neuro.WristRF,
                    'WristRE': Neuro.WristRE,

                    # 'HandR': Neuro.HandR,
                    'HandRI': Neuro.HandRI,
                    'HandRE': Neuro.HandRE,

                    # 'AnkleR': Neuro.AnkleR,
                    'AnkleRDF': Neuro.AnkleRDF,
                    'AnkleRPF': Neuro.AnkleRPF,
                    'AnkleRI': Neuro.AnkleRI,
                    'AnkleRE': Neuro.AnkleRE,

                    # 'ShoulderL': Neuro.ShoulderL,
                    'ShoulderLF': Neuro.ShoulderLF,
                    'ShoulderLE': Neuro.ShoulderLE,
                    'ShoulderLAbd': Neuro.ShoulderLAbd,
                    'ShoulderLAdd': Neuro.ShoulderLAdd,

                    # 'HipL': Neuro.HipL,
                    'HipLF': Neuro.HipLF,
                    'HipLE': Neuro.HipLE,
                    'HipLAbd': Neuro.HipLAbd,
                    'HipLAdd': Neuro.HipLAdd,

                    # 'ElbowL': Neuro.ElbowL,
                    'ElbowLF': Neuro.ElbowLF,
                    'ElbowLE': Neuro.ElbowLE,

                    # 'KneeL': Neuro.KneeL,
                    'KneeLF': Neuro.KneeLF,
                    'KneeLE': Neuro.KneeLE,

                    # 'WristL': Neuro.WristL,
                    'WristLF': Neuro.WristLF,
                    'WristLE': Neuro.WristLE,

                    # 'HandL': Neuro.HandL,
                    'HandLI': Neuro.HandLI,
                    'HandLE': Neuro.HandLE,

                    # 'AnkleL': Neuro.AnkleL,
                    'AnkleLDF': Neuro.AnkleLDF,
                    'AnkleLPF': Neuro.AnkleLPF,
                    'AnkleLI': Neuro.AnkleLI,
                    'AnkleLE': Neuro.AnkleLE,

                    'Rb1': Neuro.RB1,
                    'Rt1': Neuro.RT1,
                    'Rs1': Neuro.RS1,
                    'Rk1': Neuro.RK1,
                    'Ra1': Neuro.RA1,
                    'RPlantars1': Neuro.RPlantars1,
                    'RAbdominals1': Neuro.RAbdominals1,
                    'RAbdominals2': Neuro.RAbdominals2,
                    'RCr1': Neuro.RCr1,

                    'Lb1': Neuro.LB1,
                    'Lt1': Neuro.LT1,
                    'Ls1': Neuro.LS1,
                    'Lk1': Neuro.LK1,
                    'La1': Neuro.LA1,
                    'LPlantars1': Neuro.LPlantars1,
                    'LAbdominals1': Neuro.LAbdominals1,
                    'LAbdominals2': Neuro.LAbdominals2,
                    'LCr1': Neuro.LCr1,
                    


                    'created_by': Neuro.created_by,
                    'Date' : Neuro.created_at.strftime('%Y-%m-%d'),  # Format date
                    'Time' : Neuro.created_at.strftime('%H:%M:%S') , # Format time

                })
            # Neurology_data = [
            #     {
                    
            #     } for Neuro in Neurology
            # ]

            return JsonResponse(data, safe=False)

        except Exception as e:
            print(f"An error occurred: {str(e)}")
            return JsonResponse({'error': 'An internal server error occurred'}, status=500)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)














