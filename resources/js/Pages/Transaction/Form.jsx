import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import { Head, useForm, router } from '@inertiajs/react';
import { thousandSep } from '@/utils/templateUtil';

export default function TransasctionForm({ auth, errors, newReference, balance }) {
    const { data, setData, processing } = useForm({
        transaction_type: 'D',
        amount: 0,
        reference: newReference,
        receipt: null,
        note: ''
    });

    const onFormSubmit = (e) => {
        e.preventDefault()
        if (transaction_type === 'D') {
            setData('receipt', null)
        }

        router.post(route('transaction.add'), data, {forceFormData: true})
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add Transaction</h2>}>

            <Head title="Add Transaction" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">                    
                    <div className="block p-6 bg-white border border-gray-200 rounded-lg shadow mb-4">

                        <form onSubmit={onFormSubmit}>
                            <div className="mb-5">
                                <label htmlFor="note">Reference</label>
                                <input type="text" id="note"name="reference" placeholder="Enter reference" value={data.reference} disabled />
                                <InputError message={errors.reference} className="mt-2" />
                            </div>

                            <div className="mb-5">
                                <label htmlFor="transaction_type">Select transaction type</label>
                                <select id="transaction_type" name="transaction_type" value={data.transaction_type}  onChange={(e) => setData('transaction_type', e.target.value)} >
                                    <option value="C">Topup</option>
                                    <option value="D">Transaction</option>
                                </select>
                            </div>

                            <div className="mb-5">
                                <label htmlFor="amount">Amount (Your balance: {thousandSep(balance)})</label>
                                <input type="text" id="note" name="amount" placeholder="Enter amount" value={data.amount} onChange={(e) => setData('amount', e.target.value)} />
                                <InputError message={errors.amount} className="mt-2" />
                                {data.transaction_type === 'D' && data.amount > balance && <InputError message="Insufficient balance" className="mt-2" />}
                            </div>

                            { data.transaction_type === 'C' &&
                                <div className="mb-5">
                                    <label htmlFor="topup">Upload Receipt</label>
                                    <input id="topup" type="file" name="receipt" onChange={(e) => setData('receipt', e.target.files[0])} />
                                    <InputError message={errors.receipt} className="mt-2" />
                                </div>
                            }

                            <div className="mb-5">
                                <label htmlFor="amount">Note</label>
                                <input type="text" id="note" name="note" placeholder="Enter note" value={data.note} onChange={(e) => setData('note', e.target.value)}  />
                                <InputError message={errors.note} className="mt-2" />
                            </div>

                            <div className="mb-5">
                                <button type="submit" className="btn btn-primary" disabled={processing || (data.transaction_type === 'D' && data.amount > balance)}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
