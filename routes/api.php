<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'api'], function () {
    Route::post('authenticate',  'AuthenticateController@authenticate');

    Route::group(['middleware' => 'jwt.auth'], function () {
        Route::get('me',  'AuthenticateController@getCurrentUser');
        Route::post('tasks',  'TestController@task');
    });
});

Route::get('/foo', function ( Request $request ) {

    $pitchers = collect([
        [
            'key'  => 'php',
            'name' => 'PHP',
            'era'  => 1.62,
            'win'  => 20,
        ],
        [
            'key'  => 'ruby',
            'name' => 'Ruby',
            'era'  => 2.29,
            'win'  => 12,
        ],
        [
            'key'  => 'java',
            'name' => 'Java',
            'era'  => 2.60,
            'win'  => 17,
        ],
    ]);

    return response()->json( $pitchers );
} );

//スキル一覧の取得
Route::get('/skillset/{id}','TestController@GetSkill');
Route::post('/skillset','TestController@AddSkill');
//スキルの数字追加
Route::post('/skill/vote','TestController@AddVotes');
//スキル消去
Route::post('/skill/delete','TestController@DeleteSkill');
