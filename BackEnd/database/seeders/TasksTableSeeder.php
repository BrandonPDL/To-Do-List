<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;
use App\Models\User;

class TasksTableSeeder extends Seeder
{
    public function run()
    {
        // Crear tareas para cada usuario
        User::all()->each(function ($user) {
            Task::factory()->count(5)->create(['user_id' => $user->id]);
        });
    }
}
