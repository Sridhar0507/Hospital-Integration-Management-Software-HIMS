from django.db import models
from django.db.models import Max
from Masters.models import Location_Detials,Department_Detials



class Lenin_Catg_Master_Details(models.Model):
    catgId = models.IntegerField(primary_key=True)
    LeninCategory = models.CharField(max_length=30)
    Status = models.BooleanField(default=True)
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Lenin_Catg_Master_Details'

    def save(self, *args, **kwargs):
        if not self.catgId:
            max_id = Lenin_Catg_Master_Details.objects.aggregate(max_id=Max('catgId'))['max_id']
            self.catgId = (max_id or 0) + 1
        super(Lenin_Catg_Master_Details, self).save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.LeninCategory}"



class LeninMaster_Details(models.Model):
    LeninCode = models.IntegerField(primary_key=True)
    LeninCategory = models.ForeignKey(Lenin_Catg_Master_Details, on_delete=models.CASCADE, related_name='lenin_Category')
    LeninType = models.CharField(max_length=30)
    LeninSize = models.CharField(max_length=30)
    Status = models.BooleanField(default=True)
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'LeninMaster_Details'

    def save(self, *args, **kwargs):
        if not self.LeninCode:
            max_id = LeninMaster_Details.objects.aggregate(max_id=Max('LeninCode'))['max_id']
            self.LeninCode = (max_id or 0) + 1
        super(LeninMaster_Details, self).save(*args, **kwargs)



class Dept_Wise_Lenin_min_max_Details(models.Model):
    Id = models.AutoField(primary_key=True)
    Location = models.ForeignKey(Location_Detials, on_delete=models.CASCADE, related_name='lenin_locations')
    Department = models.ForeignKey(Department_Detials, on_delete=models.CASCADE, related_name='lenin_departments')
    LeninCategory = models.ForeignKey(Lenin_Catg_Master_Details, on_delete=models.CASCADE, related_name='lenin_Dept_Categories')
    LeninType = models.ForeignKey(LeninMaster_Details, on_delete=models.CASCADE, related_name='lenin_types')
    Prev_Minimum_count = models.IntegerField()
    Curr_Minimum_count = models.IntegerField()
    Prev_Maximum_count = models.IntegerField()
    Curr_Maximum_count = models.IntegerField()
    Status = models.BooleanField(default=True)
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Dept_Wise_Lenin_min_max_Details'
    
    def __str__(self):
        return f"{self.Location} - {self.Department} - {self.LeninCategory} - {self.LeninType}"



class Lenin_Stock_Details(models.Model):
    StockId = models.IntegerField(primary_key=True)
    LeninCategory = models.ForeignKey(Lenin_Catg_Master_Details, on_delete=models.CASCADE, related_name='lenin_Stock_Categories')
    LeninType = models.ForeignKey(LeninMaster_Details,on_delete=models.CASCADE, related_name='lenin_Stock_Types')
    Quantity = models.CharField(max_length=30)
    Status = models.BooleanField(default=True)
    created_by = models.CharField(max_length=30)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'Lenin_Stock_Details'

    def save(self, *args, **kwargs):
        if not self.StockId:
            max_id = Lenin_Stock_Details.objects.aggregate(max_id=Max('StockId'))['max_id']
            self.StockId = (max_id or 0) + 1
        super(Lenin_Stock_Details, self).save(*args, **kwargs)








