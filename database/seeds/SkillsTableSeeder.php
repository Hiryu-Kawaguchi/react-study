<?php

use Illuminate\Database\Seeder;

class SkillsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $skill_name = ['PHP','Ruby','Go','Java'];
        foreach ($skill_name as $item){
            DB::table('skills')->insert([
                'user_id' => '51',
                'skill_name' => $item,
                'votes' => rand(10,50)
            ]);
        }
    }
}
