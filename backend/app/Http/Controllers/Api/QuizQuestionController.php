<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\QuizQuestion;
use Illuminate\Http\Request;

class QuizQuestionController extends Controller
{
    public function index()
    {
        $quizQuestions = QuizQuestion::all();
        return response()->json($quizQuestions, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'question_text' => 'required|string|max:500',
            'uid' => 'required|integer|exists:users,uid',
        ]);

        $quizQuestion = QuizQuestion::create([
            'question_text' => $request->question_text,
            'uid' => $request->uid,
        ]);

        return response()->json([
            'message' => 'Quiz question created successfully',
            'data' => $quizQuestion
        ], 201);
    }

    public function show(string $id)
    {
        $quizQuestion = QuizQuestion::find($id);

        if (!$quizQuestion) {
            return response()->json(['message' => 'Quiz question not found'], 404);
        }

        return response()->json($quizQuestion, 200);
    }

    public function update(Request $request, string $id)
    {
        $quizQuestion = QuizQuestion::find($id);

        if (!$quizQuestion) {
            return response()->json(['message' => 'Quiz question not found'], 404);
        }

        $request->validate([
            'question_text' => 'required|string|max:500',
            'uid' => 'required|integer|exists:users,uid',
        ]);

        $quizQuestion->question_text = $request->question_text;
        $quizQuestion->uid = $request->uid;
        $quizQuestion->save();

        return response()->json([
            'message' => 'Quiz question updated successfully',
            'data' => $quizQuestion
        ], 200);
    }

    public function destroy(string $id)
    {
        $quizQuestion = QuizQuestion::find($id);

        if (!$quizQuestion) {
            return response()->json(['message' => 'Quiz question not found'], 404);
        }

        $quizQuestion->delete();

        return response()->json(['message' => 'Quiz question deleted successfully'], 200);
    }
}

    

 
