<?php

namespace App\Http\Controllers;

use App\Models\Avatars;
use App\Http\Requests\StoreAvatarsRequest;
use App\Http\Requests\UpdateAvatarsRequest;

class AvatarsController extends Controller
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
     * @param  \App\Http\Requests\StoreAvatarsRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreAvatarsRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Avatars  $avatars
     * @return \Illuminate\Http\Response
     */
    public function show(Avatars $avatars)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Avatars  $avatars
     * @return \Illuminate\Http\Response
     */
    public function edit(Avatars $avatars)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateAvatarsRequest  $request
     * @param  \App\Models\Avatars  $avatars
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateAvatarsRequest $request, Avatars $avatars)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Avatars  $avatars
     * @return \Illuminate\Http\Response
     */
    public function destroy(Avatars $avatars)
    {
        //
    }
}
