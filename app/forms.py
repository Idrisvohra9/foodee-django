from django import forms

from .models import Customer, Reservation


class CustomerForm(forms.ModelForm):
    class Meta:
        model = Customer
        fields = ['name', 'email', 'phone_no']

class ReservationForm(forms.ModelForm):
    class Meta:
        model = Reservation
        fields = ['number_of_guests', 'date_time', 'occasion', 'special_requests']
