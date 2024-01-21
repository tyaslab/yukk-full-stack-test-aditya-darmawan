import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function TransasctionList({ auth }) {
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
                    
                    <div className="content">
                        <h5 className="mb-2 text-lg font-bold tracking-tight">#786787678867</h5>
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-green-700">+Rp. 2.000.000</h5>
                        <p className="font-normal text-gray-700 mb-1">Anda mendapatkan dana dari Bank BRI No. Rekening 3427864837684</p>
                        <p className="text-xs">20 Mei 2024 10:00:00</p>
                    </div>

                    <div className="content">
                        <h5 className="mb-2 text-lg font-bold tracking-tight">#786787678867</h5>
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-rose-700">-Rp. 2.000.000</h5>
                        <p className="font-normal text-gray-700 mb-1">Pembayaran di TOKO EMAS ASLI LO</p>
                        <p className="text-xs">20 Mei 2024 10:00:00</p>
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
