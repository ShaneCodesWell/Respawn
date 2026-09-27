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
        Schema::create('videos', function (Blueprint $table) {
            $table->id();
            $table->string('youtube_id');
            $table->string('title');
            $table->string('type')->default('video'); // video|short
            $table->string('category')->nullable();    // only relevant for type=video
            $table->string('tag_label')->nullable();
            $table->string('duration')->nullable();
            $table->string('views')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['type', 'is_active']);
            $table->index('category');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('videos');
    }
};
