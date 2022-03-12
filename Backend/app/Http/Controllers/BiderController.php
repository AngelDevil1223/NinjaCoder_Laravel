<?php

namespace App\Http\Controllers;

use App\Models\Bider;
use App\Http\Requests\StoreBiderRequest;
use App\Http\Requests\UpdateBiderRequest;

class BiderController extends Controller
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
     * @param  \App\Http\Requests\StoreBiderRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreBiderRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Bider  $bider
     * @return \Illuminate\Http\Response
     */
    public function show(Bider $bider)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Bider  $bider
     * @return \Illuminate\Http\Response
     */
    public function edit(Bider $bider)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateBiderRequest  $request
     * @param  \App\Models\Bider  $bider
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateBiderRequest $request, Bider $bider)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Bider  $bider
     * @return \Illuminate\Http\Response
     */
    public function destroy(Bider $bider)
    {
        //
    }
}
