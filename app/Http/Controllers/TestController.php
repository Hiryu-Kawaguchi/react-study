<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestController extends Controller
{
    public function react()
    {
        return view('react_test');
    }

    public function task(Request $request){
        $id = $request['id'];
        return response()->json(['statue' => 'ok!','id' => $id]);
    }
}
