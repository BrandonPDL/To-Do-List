<?php

namespace Database\Factories;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    protected $model = Task::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'title' => $this->faker->sentence, // Asegurarse de que este campo tenga un valor
            'description' => $this->faker->paragraph,
            'completed' => $this->faker->boolean,
            'state' => $this->faker->randomElement(['pending', 'completed', 'paused', 'discarded']),
        ];
    }
}
