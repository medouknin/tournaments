<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangePasswordRequest;
use App\Services\PasswordService;

class PasswordController extends Controller
{
 
    public function changeUserPassword(ChangePasswordRequest $request)
    {
        $response = $this->service->changePassword($request->all());

        return response()->json($response);
    }
}

