<?php

namespace App\Services;

use Illuminate\Support\Facades\Hash;

final class PasswordService
{
    private function validateCurrentPassword($current_pass)
    {
        if (!password_verify($current_pass, auth()->user()->password)) {
            return false;
        }
        return true;
    }

    public function changePassword($data)
    {
        if (!$this->validateCurrentPassword($data['old_password'])) {
            return [
                'status' => 'failed',
                'message' => 'Current password is incorrect'
            ];
        }

        $updatedPass = auth()->user()->update([
            'password' =>  Hash::make($data['password'])
        ]);

        if ($updatedPass) {
            return [
                'status' => 'success',
                'message' => 'Password changed successfully'
            ];
        } else {
            return [
                'status' => 'failed',
                'message' => 'Something went wrong'
            ];
        }
    }
}
