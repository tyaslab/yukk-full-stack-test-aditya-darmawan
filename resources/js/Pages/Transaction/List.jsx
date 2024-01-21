import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

var searchTimeout = null

export default function TransasctionList({ auth, transactionList, balance, term, ...props }) {
    console.log(transactionList.current_page)
    const [searchQuery, setSearchQuery] = useState(term)

    const renderPageItem = (pageItem) => {
        if (pageItem.includes("Next")) {
            return "Next";
        } else if (pageItem.includes("Prev")) {
            return "Prev";
        }

        return pageItem;
    }

    useEffect(() => {
        clearTimeout(searchTimeout)
        if (searchQuery !== term) {
            searchTimeout = setTimeout(() => {
                router.replace(`/transaction?term=${searchQuery}`)
            }, 500)
            
        }
    }, [searchQuery]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Transactions</h2>}
        >
            <Head title="Transactions" />

            <div className="py-12">
                <div className="card">
                    <div className="content">
                        <h3 className="font-bold text-2xl mb-4">My Balance: {balance}</h3>
                        <a href={route('transaction.add')} className="inline-block btn btn-primary mb-4">Add Transaction</a>
                        <input type="text" id="note" placeholder="Search transaction..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                    </div>

                    <div className="transactionList">
                        {transactionList.data.map(transaction => (
                            <div key={transaction.id} className="content flex">
                                <div className="w-11/12">
                                    <h5 className="mb-2 text-lg font-bold tracking-tight">#{transaction.id}</h5>
                                    <h5 className={classNames({"mb-2 text-xl font-bold tracking-tight": true, "text-rose-700": transaction.transaction_type == "D", "text-green-700": transaction.transaction_type == "C"})}>{transaction.transaction_type === 'D' ? '-' : '+'} {transaction.amount}</h5>
                                    <p className="text-gray-700 mb-1">Ref: {transaction.reference}</p>
                                    <p className="text-gray-700 mb-1">Note: {transaction.note ? transaction.note : '-'}</p>
                                    <p className="text-xs">Created At: {transaction.created_at}</p>
                                </div>
                                <div className="w-1/12">
                                    <div className="aspect-square">
                                        { transaction.receipt ? (
                                            <a href={`/storage/receipt/${transaction.receipt}`} target="_blank">
                                                <img className="w-full h-full object-contain" src={`/storage/receipt/${transaction.receipt}`} />
                                            </a>
                                        ) : null }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                { transactionList.links && transactionList.links.length > 0 && (
                <div className="card">
                    <nav className="pagination">
                        <ul>
                            { transactionList.links.map((pageItem) => (
                                <li>
                                    <a href={pageItem.url} className={classNames({"pagination-number": true, "active": pageItem.active})}>
                                        {renderPageItem(pageItem.label)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                ) }
            </div>
        </AuthenticatedLayout>
    );
}
