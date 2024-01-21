<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class TransactionAddRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'transaction_type' => ['required', 'string', Rule::in(['D', 'C'])],
            'amount' => ['required', 'integer', 'min:100'],
            'reference' => ['required', 'string', 'max:255'],
            'receipt' => ['nullable', 'file', 'max:5120', 'required_if:transaction_type,C'],
            'note' => ['nullable', 'string', 'max:255']
        ];
    }
}
