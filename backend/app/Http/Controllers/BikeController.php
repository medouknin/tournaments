<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Bike;
use Illuminate\Support\Facades\Validator;

class BikeController extends Controller
{

    
    public function index(){
        $data = Bike::get();
        return response()->json($data);
    }
    public function store(Request $request){
        $validator = Validator::make(
            $request->all(),
            [
                'image' => 'required'
            ]
        );

        if ($validator->fails()) {
            return response()->json(["status" => "failed", "message" => "Validation error", "errors" => $validator->errors()]);
        }
        $image = $request->file('image');
        $imageName = time() . '_' . $image->getClientOriginalName();
        $image->move('storage/uploads', $imageName);

        $bike = new Bike();
        $bike->brand = $request->input('brand');
        $bike->description = $request->input('description');
        $bike->image = $imageName; 
        $bike->isRented =0;
        $bike->material = $request->input('material');
        $bike->price_per_hour = $request->input('price_per_hour');
        $bike->size = $request->input('size');
        $bike->type = $request->input('type');
        $bike->save();

        return response()->json([
            'message' => 'Tournament added successfully',
            'bike' => $bike 
        ], 201);
    }
    public function destroy(string $id)
    {
        $user = Bike::findOrFail($id);

        $user->delete();
        return response()->json([
            'message' => 'Tournament deleted successfully'
        ], 204);
    }
}
