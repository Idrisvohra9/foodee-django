from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

from .models import Customer, Event, MenuCategory, MenuItem, Reservation

# from .forms import CustomerForm, ReservationForm

# Create your views here.
# Super user details:
# Name: IdrisAdmin
# Password: Vohra987


def index(request) -> HttpResponse:
  # Fetch MenuCategories and related MenuItems
    categories = MenuCategory.objects.all()
    events = Event.objects.filter(is_deleted=False)
    featuredMenuItems = MenuItem.objects.filter(
        is_available=True, is_featured=True)
    
    context = {
        'categories': categories,
        "events": events,
        "featuredItems": featuredMenuItems
    }
    return render(request, 'index.html', context)


def make_reservation(request) -> HttpResponse:
    if request.method == 'POST':
        print(request.POST)
        name = request.POST["name"]
        email = request.POST["email"]
        phone_no = request.POST["phone_no"]
        number_of_guests = request.POST["number_of_guests"]
        date_time = request.POST["date_time"]
        occasion = request.POST["occasion"]
        special_requests = request.POST["special_requests"]

        # customer = Customer(name=name, email=email, phone_no=phone_no)
        # customer.save()
        # reservation = Reservation(customer=customer,
        #   number_of_guests=number_of_guests,
        #   date_time=date_time,
        #   occasion=occasion, special_requests=special_requests
        #   )
        # reservation.save()
        return JsonResponse({'status': 'success'})
    else:
        return JsonResponse({'status': 'method not allowed'})


def NotFound(request, exception) -> HttpResponse:
    return render(request, 'NotFound.html')
