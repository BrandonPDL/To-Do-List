<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index(Request $request)
    {
        // Inicializar la consulta con la relación de usuario
        $query = Task::with('user:id,name,email');

        

        // Verificar si hay un término de búsqueda
        if ($request->has('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }
        if ($request->has('state')) {
            $query->Where('state','like', '%' . $request->state . '%');
        }
        
        // Aplicar paginación
        $tasks = $query->paginate(10);

        return response()->json($tasks, 200);
    }
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'required|boolean',
            'state' => 'required|string|in:pending,completed,paused,discarded',
        ]);

        $task = Task::create([
            'user_id' => Auth::id(),
            'title' => $request->title,
            'description' => $request->description,
            'completed' => $request->completed,
            'state' => $request->state,
        ]);
        $task->save();

        return response()->json($task, 201);
    }

    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'boolean',
            'state' => 'sometimes|required|string|in:pending,completed,paused,discarded',
        ]);

        $task->update($request->all());

        return response()->json($task, 200);
    }

    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return response()->json(null, 204);
    }
}

