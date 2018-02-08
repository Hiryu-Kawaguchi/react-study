<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use App\Skill;

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

    public function AllSkill($user_id){
        $skills = Skill::Where('user_id',$user_id)->get();
        $skill = array();
        foreach ($skills as $key => $value){
            $skill[$key]['skill_id'] = $value->id;
            $skill[$key]['user_id'] = $value->user_id;
            $skill[$key]['skill_name'] = $value->skill_name;
            $skill[$key]['votes'] = $value->votes;
        }
        return response()->json( $skill );
    }

    public function GetSkill($id){
        $user_id = $id;
        $skills = $this->AllSkill($user_id);
        return $skills;
    }

    public function AddSkill(Request $request){
        $user_id = (int)$request['userid'];
        $skill_name = $request['name'];

        $skill = new Skill;
        $skill->skill_name = $skill_name;
        $skill->user_id = $user_id;
        $skill->votes = 0;
        $skill->save();

        $skills = $this->AllSkill($user_id);
        return $skills;
    }

    public function AddVotes(Request $request){
        $user_id = (int)$request['userid'];
        $skill_id = (int)$request['skillid'];
        $votes = (int)$request['votes'];

        $skill = Skill::where('id',$skill_id)->first();
        $skill->votes = $votes;
        $skill->save();

        $skills = $this->AllSkill($user_id);
        return $skills;
    }

    public function DeleteSkill(Request $request){
        $user_id = (int)$request['userid'];
        $skill_id = (int)$request['skillid'];

        $skill = Skill::where('id',$skill_id)->first();
        $skill->delete();

        $skills = $this->AllSkill($user_id);
        return $skills;
    }
}
