import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import classNames from 'classnames';

export default function TransasctionList({ auth, transactionList }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Transactions</h2>}
        >
            <Head title="Transactions" />

            <div className="py-12">
                <div className="card">
                    <div className="content">
                        <h3 className="font-bold text-2xl mb-4">My Balance: Rp. 10.000</h3>

                        <input type="text" id="note" placeholder="Search transaction..." />
                    </div>
                    
                    <div className="transactionList">
                        {transactionList.map(transaction => (
                            <div className="content">
                            <h5 className="mb-2 text-lg font-bold tracking-tight">#{transaction.id}</h5>
                            <h5 className={classNames({"mb-2 text-xl font-bold tracking-tight": true, "text-rose-700": transaction.transaction_type == "D", "text-green-700": transaction.transaction_type == "C"})}>{transaction.transaction_type === 'D' ? '-' : '+'} {transaction.amount}</h5>
                            <p className="text-gray-700 mb-1">Ref: {transaction.reference}</p>
                            <p className="text-gray-700 mb-1">Note: {transaction.note ? transaction.note : '-'}</p>
                            <p className="text-xs">Created At: {transaction.created_at}</p>
                        </div>
                        ))}
                    </div>
                </div>

                <div className="card">
                    <nav className="pagination">
                        <ul>
                            <li>
                                <a href="#" className="pagination-number">
                                    <span className="sr-only">Previous</span>
                                    <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="pagination-number">1</a>
                            </li>
                            <li>
                                <a href="#" className="pagination-number">2</a>
                            </li>
                            <li>
                                <a href="#" aria-current="page" className="pagination-number">3</a>
                            </li>
                            <li>
                                <a href="#" className="pagination-number">4</a>
                            </li>
                            <li>
                                <a href="#" className="pagination-number">5</a>
                            </li>
                            <li>
                                <a href="#" className="pagination-number">
                                    <span className="sr-only">Next</span>
                                    <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
