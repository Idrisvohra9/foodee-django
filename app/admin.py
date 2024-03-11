from django.contrib import admin

from .models import *


class MenuItemAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price', "display_picture", "is_available", "is_featured"]
    search_fields = ['name', 'category__name']


    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)



class MenuCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', "display_picture"]
    search_fields = ['name']

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)

class EventsAdmin(admin.ModelAdmin):
    list_display = ['title', 'description', "date", "is_deleted"]
    search_fields = ['title']

class WaitListAdmin(admin.ModelAdmin):
    list_display = ['busy']
    def has_add_permission(self, request):
        # Disable the ability to add new objects
        return False

    def has_delete_permission(self, request, obj=None):
        # Disable the ability to delete objects
        return False
    
    
class ReservationAdmin(admin.ModelAdmin):
    list_display = ['customer',"number_of_guests","date_time", "occasion", "special_requests", "created_at", "expired", "were_present"]
    search_fields = ['customer__name']
    
    
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['name', "email", "phone_no"]
    search_fields = ['name', "email", "phone_no"]
    
    
admin.site.register(MenuCategory, MenuCategoryAdmin)
admin.site.register(MenuItem, MenuItemAdmin)
admin.site.register(Event, EventsAdmin)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(WaitList, WaitListAdmin)
admin.site.register(Reservation, ReservationAdmin)
