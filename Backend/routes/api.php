<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthUserController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


// Freelancer / Admin register
Route::post('register' , [AuthUserController::class , 'create']);

// freelancer / Adimm login
Route::post('login' , [AuthUserController::class , 'login']);

//  freelancer get him avatar from leaderboard
Route::get('get/avatar/{id}', [AuthUserController::class ,'getAvatar']);

//  admin upload file part
Route::post('fileupload', [AuthUserController::class, 'fileUploadPost']);

//  admin can ticket
Route::post('ticket' , [AuthUserController::class, 'postTicket']);

// pagination get tickets
Route::post('get/tickets' , [AuthUserController::class , 'getTicket']);

// get all records from tickets
Route::get('get/cnttickets', [AuthUserController::class, 'getAllRecords']);

// get selected one ticket for admin
Route::get('get/ticket/{id}' , [AuthUserController::class, 'getSelectedTicket']);

// freelancer can bid
Route::post('bid' , [AuthUserController::class , 'postBid']);

//freelancer can see biders of selected task
Route::get('biders/{id}' , [AuthUserController::class , 'getBiders']);

// freelancer can see 5 top leaders
Route::get('leaders' , [AuthUserController::class , 'getLeaders']);

// Admin can post avatar
Route::post('avatars' , [AuthUserController::class , 'postAvatar']);

// Admin / freelancer can get all avatars
Route::get('avatars' , [AuthUserController::class , 'getAvatars']);

// Freelancer can request to buy the avatar
Route::post('avatar' , [AuthUserController::class , 'requestAvatar']);

// Admin can get request list of selected avatar
Route::post('avareq' , [AuthUserController::class , 'getAvaReqs']);

// Admin can permission and sell avatar with click true select.
Route::post('sellavatar' , [AuthUserController::class, 'sellAvatar']);

// Admin can award selected bider
Route::post('award/ticket' , [AuthUserController::class, 'awardBider']);

// Admin can select  Complete/InComplete the result of ticket
Route::post('status/changed' ,[AuthUserController::class , 'ticketResult']);

// Admin can report result of freelancer work
Route::post('report' , [AuthUserController::class , 'Report']);

// Admin can see all freelancers 
Route::get('freelancers' , [AuthUserController::class , 'viewAllFreelancers']);

// Admin can permission waiting freelancer
Route::post('update/Authuser' , [AuthUserController::class , 'updateAuthuser']);