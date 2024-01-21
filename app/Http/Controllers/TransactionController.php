<?php

namespace App\Http\Controllers;

use App\Http\Requests\TransactionAddRequest;
use App\Models\Transaction;
use App\Models\Balance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Ramsey\Uuid\Uuid;
use DB;

class TransactionController extends Controller
{
    public function index(): Response
    {
        $transactionList = Transaction::where('user_id', auth()->user()->id);
        
        $term = request()->query('term');

        if ($term) {
            $transactionList = $transactionList->where('reference', 'ilike', '%' . $term . '%');
        }

        $transactionList = $transactionList->orderBy('created_at', 'desc')->paginate(config('app.limit_per_page', 20));

        $balance = Balance::where('user_id', auth()->user()->id)->first();
        if (!$balance) {
            $balance = 0;
        } else {
            $balance = $balance->balance;
        }

        return Inertia::render('Transaction/List', [
            'term' => $term,
            'balance' => $balance,
            'transactionList' => $transactionList
        ]);
    }

    public function formAdd(): Response
    {
        
        $newReference = Uuid::uuid4();
        return Inertia::render('Transaction/Form', [
            'newReference' => $newReference
        ]);
    }


    public function add(TransactionAddRequest $request): RedirectResponse
    {
        $validData = $request->validated();
        $validData['user_id'] = auth()->user()->id;

        if ($validData['transaction_type'] == 'D') {
            unset($validData['receipt']);
        } else {
            //upload image
            $image = $request->file('receipt');
            $image->storeAs('public/receipt', $image->hashName());
            $validData['receipt'] = $image->hashName();
        }

        $validData['reference'] = strtolower($validData['reference']);
        Transaction::create($validData);

        // modify balance
        $amountToBalance = $validData['amount'];
        if ($validData['transaction_type'] == 'D') {
            $amountToBalance = -1 * $amountToBalance;
        }

        DB::statement(
            'INSERT INTO balances (user_id, balance, created_at, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) ON CONFLICT (user_id) DO UPDATE SET balance = balances.balance + ?, updated_at = CURRENT_TIMESTAMP',
            [auth()->user()->id, $validData['amount'], $amountToBalance]
        );

        return Redirect::to('/transaction');
    }
}
