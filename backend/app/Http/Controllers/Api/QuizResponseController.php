<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\QuizResponse;
use Illuminate\Http\Request;

class QuizResponseController extends Controller
{
    public function index()
    {
        $quizResponses = QuizResponse::all();
        return response()->json($quizResponses, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'answer' => 'required|string|max:500',
            'uid' => 'required|integer|exists:users,uid',
            'qid' => 'required|integer|exists:quiz_questions,qid',
        ]);

        $quizResponse = QuizResponse::create([
            'answer' => $request->answer,
            'uid' => $request->uid,
            'qid' => $request->qid,
        ]);

        return response()->json([
            'message' => 'Quiz response created successfully',
            'data' => $quizResponse
        ], 201);
    }

    public function show(string $id)
    {
        $quizResponse = QuizResponse::find($id);

        if (!$quizResponse) {
            return response()->json(['message' => 'Quiz response not found'], 404);
        }

        return response()->json($quizResponse, 200);
    }

    public function update(Request $request, string $id)
    {
        $quizResponse = QuizResponse::find($id);

        if (!$quizResponse) {
            return response()->json(['message' => 'Quiz response not found'], 404);
        }

        $request->validate([
            'answer' => 'required|string|max:500',
            'uid' => 'required|integer|exists:users,uid',
            'qid' => 'required|integer|exists:quiz_questions,qid',
        ]);

        $quizResponse->answer = $request->answer;
        $quizResponse->uid = $request->uid;
        $quizResponse->qid = $request->qid;
        $quizResponse->save();

        return response()->json([
            'message' => 'Quiz response updated successfully',
            'data' => $quizResponse
        ], 200);
    }

    public function destroy(string $id)
    {
        $quizResponse = QuizResponse::find($id);

        if (!$quizResponse) {
            return response()->json(['message' => 'Quiz response not found'], 404);
        }

        $quizResponse->delete();

        return response()->json(['message' => 'Quiz response deleted successfully'], 200);
    }
}
