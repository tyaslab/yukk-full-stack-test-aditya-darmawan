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
            'transaction_type' => ['required', 'string', 'uppercase', Rule::in(['D', 'C'])],
            'amount' => ['required', 'integer', 'min:100'],
            'reference' => ['required', 'string', 'max:255'],
            // 'receipt' => ['file', 'size:5120', Rule::requiredIf($this->user()->transaction_type == 'C')],
            'note' => ['nullable', 'string', 'max:255']
        ];
    }
}
