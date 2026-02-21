import json

def get_judge_score(query, response, context, rubric):
    """
    Prompts an LLM to judge a response based on a specific rubric.
    """
    prompt = f"""
    ### RUBRIC:
    {json.dumps(rubric, indent=2)}
    
    ### CONTEXT:
    {context}
    
    ### QUERY:
    {query}
    
    ### STUDENT RESPONSE:
    {response}
    
    Grade the response. Return a JSON with 'score' (1-5) and 'justification'.
    """
    # mock logic
    return {"score": 5, "justification": "Excellent IRAC structure and perfect grounding."}

if __name__ == "__main__":
    print(get_judge_score("Q", "A", "C", {"metric": "IRAC"}))
