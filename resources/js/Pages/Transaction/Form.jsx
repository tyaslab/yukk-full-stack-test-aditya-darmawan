import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import { Head, useForm } from '@inertiajs/react';

const DEFAULT_DATA = {
    transaction_type: 'D',
    amount: 0,
    reference: '',
    receipt: null,
    note: ''
}

export default function TransasctionForm({ auth }) {
    const { data, setData, post, processing, errors } = useForm(DEFAULT_DATA);

    const onFormSubmit = (e) => {
        e.preventDefault()
        post(route('transaction.add'))
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
                                <label htmlFor="transaction_type">Select transaction type</label>
                                <select id="transaction_type" value={data.transaction_type}  onChange={(e) => setData(prev => ({...prev, transaction_type: e.target.value}))} >
                                    <option value="C">Topup</option>
                                    <option value="D">Transaction</option>
                                </select>
                            </div>

                            <div className="mb-5">
                                <label htmlFor="amount">Amount</label>
                                <input type="text" id="note" placeholder="Enter amount" value={data.amount} onChange={(e) => setData(prev => ({...prev, amount: e.target.value}))} />
                                <InputError message={errors.amount} className="mt-2" />
                            </div>

                            <div className="mb-5">
                                <label htmlFor="note">Reference</label>
                                <input type="text" id="note" placeholder="Enter reference" value={data.reference} onChange={(e) => setData(prev => ({...prev, reference: e.target.value}))}  />
                                <InputError message={errors.reference} className="mt-2" />
                            </div>

                            <div className="mb-5">
                                <label htmlFor="topup">Upload Receipt</label>
                                <input id="topup" type="file" />
                                <InputError message={errors.receipt} className="mt-2" />
                            </div>

                            <div className="mb-5">
                                <label htmlFor="amount">Note</label>
                                <input type="text" id="note" placeholder="Enter note" value={data.note} onChange={(e) => setData(prev => ({...prev, note: e.target.value}))}  />
                                <InputError message={errors.note} className="mt-2" />
                            </div>

                            <div className="mb-5">
                                <button type="submit" className=" btn btn-primary" disabled={processing}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
