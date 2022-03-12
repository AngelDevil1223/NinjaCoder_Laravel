<?php

namespace App\Http\Controllers;

use App\Models\LeaderBoard;
use App\Http\Requests\StoreLeaderBoardRequest;
use App\Http\Requests\UpdateLeaderBoardRequest;

class LeaderBoardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreLeaderBoardRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreLeaderBoardRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\LeaderBoard  $leaderBoard
     * @return \Illuminate\Http\Response
     */
    public function show(LeaderBoard $leaderBoard)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\LeaderBoard  $leaderBoard
     * @return \Illuminate\Http\Response
     */
    public function edit(LeaderBoard $leaderBoard)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateLeaderBoardRequest  $request
     * @param  \App\Models\LeaderBoard  $leaderBoard
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateLeaderBoardRequest $request, LeaderBoard $leaderBoard)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\LeaderBoard  $leaderBoard
     * @return \Illuminate\Http\Response
     */
    public function destroy(LeaderBoard $leaderBoard)
    {
        //
    }
}
