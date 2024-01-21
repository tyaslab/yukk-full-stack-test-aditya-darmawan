import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

const DEFAULT_DATA = {
    transaction_type: 'D',
    amount: 0,
    reference: '',
    topupReceipt: null,
    note: ''
}

export default function TransasctionForm({ auth }) {
    const [data, setData] = useState(DEFAULT_DATA)

    const onFormSubmit = (e) => {
        e.preventDefault()
        console.log(data)
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
                                <label for="transaction_type">Select transaction type</label>
                                <select id="transaction_type" value={data.transaction_type}  onChange={(e) => setData(prev => ({...prev, transaction_type: e.target.value}))} >
                                    <option value="C">Topup</option>
                                    <option value="D">Transaction</option>
                                </select>
                            </div>

                            <div className="mb-5">
                                <label for="amount">Amount</label>
                                <input type="text" id="note" placeholder="Enter amount" value={data.amount} onChange={(e) => setData(prev => ({...prev, amount: e.target.value}))} />
                            </div>

                            <div className="mb-5">
                                <label for="note">Reference</label>
                                <input type="text" id="note" placeholder="Enter reference" value={data.reference} onChange={(e) => setData(prev => ({...prev, reference: e.target.value}))}  />
                            </div>

                            <div className="mb-5">
                                <label for="topup">Upload Topup Receipt</label>
                                <input id="topup" type="file" />
                            </div>

                            <div className="mb-5">
                                <label for="amount">Note</label>
                                <input type="text" id="note" placeholder="Enter note" value={data.note} onChange={(e) => setData(prev => ({...prev, note: e.target.value}))}  />
                            </div>

                            <div className="mb-5">
                                <button type="submit" className=" btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
