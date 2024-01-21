<?php

namespace App\Http\Controllers;

use App\Http\Requests\TransactionAddRequest;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TransactionController extends Controller
{
    public function index(): Response
    {
        $transactionList = Transaction::where('user_id', auth()->user()->id)->orderBy('created_at', 'desc')->get();
        return Inertia::render('Transaction/List', [
            'transactionList' => $transactionList
        ]);
    }

    public function add(TransactionAddRequest $request): RedirectResponse
    {

        // //upload image
        // $image = $request->file('receipt');
        // $image->storeAs('public/receipt', $image->hashName());

        $validData = $request->validated();
        $validData['user_id'] = auth()->user()->id;

        // if ($validData->transaction_type == 'D') {
        //     unset($validData->receipt);
        // }

        Transaction::create($validData);

        return Redirect::to('/transaction');
    }
}
