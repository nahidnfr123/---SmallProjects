<?php

namespace App\Http\Controllers\api\v1\auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $login = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);
        if (!Auth::attempt($login)) {
            return response(["message"=>"Invalid login credentials."]);
        }
        // $accessToken = Auth::user()->createToken("authToken")->;
        return response(["message"=>""]);
    }
}
