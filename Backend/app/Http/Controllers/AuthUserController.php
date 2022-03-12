<?php

namespace App\Http\Controllers;

use App\Models\AuthUser;
use App\Models\LeaderBoard;
use App\Models\Tickets;
use App\Models\Bider;
use App\Models\Avatars;
use App\Models\avatarRequest;

use Illuminate\Http\Request;
use App\Http\Requests\StoreAuthUserRequest;
use App\Http\Requests\UpdateAuthUserRequest;
use Illuminate\Support\Facades\Storage;

class AuthUserController extends Controller
{
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    //register freelancer / admin
    public function create(Request $request) 
    {
        if(AuthUser::where('user_skypeid',$request->user_skypeid)->exists())
            return response()->json([
                "message" => "the user already exists!"
            ],400);
        $authuser = new AuthUser;
        $authuser->user_skypeid = $request->user_skypeid;
        $authuser->access = "false";

        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $charactersLength = strlen($characters);
        $randomString = '';
        for ($i = 0; $i < 10; $i++) {
            $randomString .= $characters[rand(0, $charactersLength - 1)];
        }
        $authuser->password = $randomString;
        $authuser->user_id = "";
        $authuser->save();

        return response()->json([
            "message" => "Register success"
        ], 201);
    }


    // Freelancer / admin login part

    public function login(Request $request)
    {
        if(AuthUser::where('password', $request->user_id)->exists()) {
            $authuser = AuthUser::where('password', $request->user_id)->get()->toJson(JSON_PRETTY_PRINT);
            $authuser = json_decode($authuser);
            if($authuser[0]->access != "true") {
                return response()->json([
                    "message" => "Your account is inactive"
                ],401);
            }

            if(LeaderBoard::where('Leader_id' , $request->user_id)->exists())
                return response()->json([
                    "id" => $authuser[0]->user_id
                ]);

            $leader = new LeaderBoard;
            $leader->Leader_id = $request->user_id;
            $leader->Leader_name = $authuser[0]->user_id;
            $leader->Leader_budget = 0;
            $leader->Leader_success = 0;
            $leader->Leader_avatar = "http://localhost:8080/static/images/contact.png";
            $leader->save();
            return response()->json([
                "id" => $authuser[0]->user_id
            ]);
        }
        else {
            return response()->json([
                "message" => "User Not found"
            ], 404);
        }
    }


    //  Freelancer get his avatar from leaderboard when login

    public function getAvatar($id) 
    {
        $leaderboard = LeaderBoard::where('Leader_Name' , $id)->get()->toJson(JSON_PRETTY_PRINT);
        $leaderboard = json_decode($leaderboard);
        return response()->json($leaderboard[0] , 200);
    }



    // Admin upload part

    public function fileUploadPost(Request $request)
    {

        $response = [];
        $filename = "";
        if($request->has('formData')) {
                $filename = '$'.$request->file('formData')->getClientOriginalName();
                $request->file('formData')->move('./uploads', $filename);
                return response()->json([
                    "messages" => $filename
                ]);

            $response["status"] = "successs";
            $response["message"] = "Success! image(s) uploaded";
        }
        else {
            $response["status"] = "failed";
            $response["message"] = "Failed! image(s) not uploaded";
        }
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreAuthUserRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreAuthUserRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AuthUser  $authUser
     * @return \Illuminate\Http\Response
     */
    public function show(AuthUser $authUser)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\AuthUser  $authUser
     * @return \Illuminate\Http\Response
     */
    public function edit(AuthUser $authUser)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateAuthUserRequest  $request
     * @param  \App\Models\AuthUser  $authUser
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateAuthUserRequest $request, AuthUser $authUser)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AuthUser  $authUser
     * @return \Illuminate\Http\Response
     */
    public function destroy(AuthUser $authUser)
    {
        //
    }



    // admin can post ticket

    public function postTicket(Request $request) {
        if( Tickets::where('ticket_description' , $request->ticket_description)->exists())
            return response()->json([
                "messages" => "the ticket already exist!"
            ],400);
        $ticket = new Tickets;
        $ticket->ticket_name = $request->ticket_name;
        $ticket->ticket_description = $request->ticket_description;
        $ticket->ticket_skills = $request->ticket_skills;
        if($request->upload == "")
            $ticket->ticket_upload = "";
        else {
            $ticket->ticket_upload = $request->upload;
        }
        $ticket->ticket_deadline = $request->ticket_deadline;
        $ticket->ticket_price = $request->ticket_price;
        $ticket->ticket_status = "Not Assigned";
        $ticket->ticket_winner = "none";
        $ticket->ticket_budget = 0;
        $ticket->winner_avatar = "";
        $ticket->winner_deadline = "";
        $ticket->feedback = "";
        $ticket->review = "";
        $ticket->save();

        return response($ticket , 200);
    }

    // pagination tickets
    public function getTicket(Request $request) {
        $pagenum = (int)$request->pagenum;
        $pagesize = (int)$request->pagesize;
        $start = ($pagenum - 1) * $pagesize;
        $result1 = [];
        $j = 0;
        $tickets = Tickets::all();
        $end = $start + $pagesize - 1;
        if(count($tickets) <= $end)
            $end = count($tickets) - 1;
        if(count($tickets) < $pagesize)
            $end = count($tickets) - 1;
        for($i = $start ; $i <= $end ; $i++)
        {
            if($tickets[$i]) 
            {
                $result1[$j] = $tickets[$i];
                $j++;
            }
            else
                continue;
        }
        return response($result1 , 200);

    }

    // get all records of tickets table
    public function getAllRecords() {
        $tickets = Tickets::all();
        $count = count($tickets);
        return response($count , 200);
    }

    // get selected one ticket for admin
    public function getSelectedTicket($id) {
        if(Tickets::where('id',$id)->exists()) {
            $ticket = Tickets::where('id', $id)->get()->toJson(JSON_PRETTY_PRINT);
            return response($ticket , 200);
        } else {
            return response()->json([
                "message" => "Ticket not found"
            ], 500);
        }
    }

    // freelancer can bid
    public function postBid(Request $request) {

        if(Bider::where('ticket_id', $request->ticket_id)->where('bider_id', $request->bider_id)->exists())
               return response()->json([
                    "messages" => "You already bidded it"
                ], 500);
        $bider = new Bider;
        $bider->ticket_id = $request->ticket_id;
        $bider->bid_price = $request->bid_price;
        $bider->bid_description = $request->bid_description;
        $bider->bid_deadline = $request->bid_deadline;
        $bider->bider_id = $request->bider_id;
        $bider->bider_url = $request->bider_url;
        $bider->save();
        return response($bider , 200);
    }

    // freelancer can view bidders of selected task
    public function getBiders($id) {
        $result = Bider::where('ticket_id', $id)->get()->toJson(JSON_PRETTY_PRINT);
        return response($result , 200);
    }

    // freelancer can view 5 top leaders
    public function getLeaders() {
        $leader = LeaderBoard::orderBy('Leader_budget', 'desc')->take(5)->get();
        return response($leader , 200);
    }


    // Admin can post avatar
    public function postAvatar(Request $request) {
        if(Avatars::where('ava_url' , $request->ava_url)->exists())
            return response()->json([
                "messages" => "That avatar already exists"
            ], 500);
        $avatar = new Avatars;
        $avatar->ava_url = $request->ava_url;
        $avatar->ava_budget = $request->ava_budget;
        $avatar->ava_level = $request->ava_level;
        $avatar->ava_status = "0";
        $avatar->user_id = "";
        $avatar->save();
        return response($avatar , 200);
    }

    // Admin / freelancer get all avatars 
    public function getAvatars() {
        $result = Avatars::all();
        return response($result , 200);
    }

    // Freelancer can Request to buy avatar
    public function requestAvatar(Request $request) {
        if(avatarRequest::where('Avatar_url', $request->avatar_url)->where('request_id', $request->request_id)->exists())
           return response()->json([
                "messages" => "You already requested it"
            ], 500);
        $avaReq = new avatarRequest;
        $avaReq->Avatar_url = $request->avatar_url;
        $avaReq->request_id = $request->request_id;
        $avaReq->status = "false";
        $avaReq->save();

        return response($avaReq , 200);
    }

    // Admin can get All request of selected avatar
    public function getAvaReqs(Request $request) {
        $result = avatarRequest::where('Avatar_url' , $request->id)->get()->toJson(JSON_PRETTY_PRINT);
        return response($result , 200);
    }

    // Admin can sell avatar to good requester
    public function sellAvatar(Request $request) {
        $avaReqUpdate = avatarRequest::where('Avatar_url' , $request->avatar_url)->where('request_id' , $request->request_id)->update(['status' => $request->value]);
        $leaderUpdate = LeaderBoard::where('Leader_Name' , $request->request_id)->update(['Leader_avatar' => $request->avatar_url]);
        $avatarUpdate = Avatars::where('ava_url' , $request->avatar_url)->update(['ava_status' => "1"]);
        $bider = Bider::where('bider_id' , $request->request_id)->update(['bider_url' => $request->avatar_url]);
        return response()->json([
            "messages"=> "success"
        ]);
    }

    // Admin can award the ticket to selected bider
    public function awardBider(Request $request) {
        $award = Tickets::where('id', $request->ticket_id)->update(['ticket_status' => "Assigned" , 'ticket_winner' => $request->bider_id, 'ticket_budget'=> $request->bider_price, "winner_avatar"=>$request->bider_url , "winner_deadline" => $request->bider_deadline]);
        return response()->json([
            "messages" => "success"
        ]);
    }

    // Admin can select Complete / Incomplete of the result ticket
    public function ticketResult(Request $request) {
        $update = Tickets::where('id', $request->id)->update(['ticket_status' => $request->value]);

        $donecnt = 0;
        $nocnt = 0;
        $budget = 0;
        $success = 0;
        $result1 = Tickets::where('ticket_winner' , $request->user)->get();
        $end = count($result1);
        for($i = 0 ; $i < $end ; $i++) {
            if($result1[$i]->ticket_status == "Complete") {
                $budget += (float)$result1[$i]->ticket_budget;
                $donecnt += 1;
            }
            else if($result1[$i]->ticket_status == "Incomplete") {
                $nocnt += 1; 
            }
        }
        $success = ($donecnt / ($donecnt + $nocnt)) * 100;
        $update1 = LeaderBoard::where('Leader_Name', $request->user)->update(['Leader_budget' => $budget , 'Leader_success' => $success]);
        return response()->json([
            "messages" => "success"
        ]);
    }

    // Admin can report the result of freelancer's work
    public function Report(Request $request) {
        $result = Tickets::where('id' , $request->id)->update(['feedback' => $request->feedback , 'review' => $request->review]);
        return response()->json([
            "messages" => "Success"
        ]);
    }

    // Admin can see all freelancers
    public function viewAllFreelancers() {
        $result = AuthUser::all();
        return response($result , 200);
    }

    // Admin can permission waiting freelancer
    public function updateAuthuser(Request $request) {
        $result = AuthUser::where('id', $request->id)->update(['access'=>$request->access , 'user_id'=> $request->user_id]);
        return response()->json([
            "messages" => "success"
        ]);
    }
}
