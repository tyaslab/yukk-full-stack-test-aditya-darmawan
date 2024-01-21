<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->index('user_id', 'transaction_user_id_idx');
        });

        Schema::table('balances', function (Blueprint $table) {
            $table->unique('user_id', 'balances_user_id_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transactions', function (Blueprint $table) {
            $table->dropIndex('transaction_user_id_idx');
        });

        Schema::table('balances', function (Blueprint $table) {
            $table->dropIndex('balances_user_id_idx');
        });
    }
};
