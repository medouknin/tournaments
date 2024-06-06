<?php

namespace App\Http\Controllers;

use App\Models\Rental;
use Carbon\Carbon;
use Illuminate\Http\Request;

class RentalController extends Controller
{
    

    public function index()
    {
        $rentals = Rental::get();

        return response()->json($rentals);
    }

    public function store(Request $request)
    {
        $request->validate([
            'bike_id' => 'required',
            'user_id' => 'required',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'total_price' => 'required|numeric',
        ]);

        $rental = new Rental();
        $rental->bike_id = $request->bike_id;
        $rental->user_id = $request->user_id;
        $rental->start_date = $request->start_date;
        $rental->end_date = $request->end_date;
        $rental->total_price = $request->total_price;
        $rental->status = 'Not Started';
        $rental->save();

        return response()->json(['message' => 'Rental information stored successfully', 'rental' => $rental], 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'bike_id' => 'required',
            'user_id' => 'required',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'total_price' => 'required|numeric',
            'status' => 'required|in:Not Started,In Progress,Completed,Canceled',
        ]);

        $rental = Rental::findOrFail($id);
        $rental->bike_id = $request->bike_id;
        $rental->user_id = $request->user_id;
        $rental->start_date = $request->start_date;
        $rental->end_date = $request->end_date;
        $rental->total_price = $request->total_price;
        $rental->status = $request->status;
        $rental->save();

        return response()->json(['message' => 'Rental information updated successfully', 'rental' => $rental], 200);
    }

    public function destroy($id)
    {
        $rental = Rental::findOrFail($id);
        $rental->delete();

        return response()->json(['message' => 'Rental information deleted successfully'], 200);
    }

    public function totalIncome(){
        $rentals = Rental::all();
        $total = 0;
        foreach($rentals as $rental){
            $total += $rental->total_price;
        }
        return response()->json(['message' => 'Total Income', 'total' => $total], 200);
    }

    public function cancelRental($id)
    {
        $rental = Rental::findOrFail($id);
        $rental->status = 'Canceled';
        $rental->end_date = '-' ;
        $rental->total_price = 0;

        $rental->save();

        return response()->json(['message' => 'Rental canceled successfully', 'rental' => $rental], 200);
    }

    public function updateStatus()
    {
        $rentals = Rental::all();

        foreach ($rentals as $rental) {
            $currentDate = Carbon::now();
            $startDate = Carbon::parse($rental->start_date);
            $endDate = Carbon::parse($rental->end_date);
            if($rental->status != 'Canceled'){

                if ($currentDate->gte($startDate) && $currentDate->lt($endDate)) {
                    $rental->status = 'In Progress';
                } elseif ($currentDate->gte($endDate)) {
                    $rental->status = 'Completed';
                }
            }
            $rental->save();
        }

        return response()->json(['message' => 'Rental statuses updated successfully'], 200);
    }
}
