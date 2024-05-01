# Create a `get_dealer_reviews` view to render the reviews of a dealer
def get_dealer_reviews(request, dealer_id):
    try:
        if dealer_id:
            endpoint = "/fetchReviews/dealer/" + str(dealer_id)
            reviews = get_request(endpoint)
            if reviews:
                for review_detail in reviews:
                    response = analyze_review_sentiments(review_detail.get('review'))
                    if response:
                        review_detail['sentiment'] = response.get('sentiment')
                    else:
                        review_detail['sentiment'] = None
                return JsonResponse({"status": 200, "reviews": reviews})
            else:
                return JsonResponse({"status": 200, "reviews": []})
        else:
            return JsonResponse({"status": 400, "message": "Bad Request"})
    except Exception as e:
        logger.error(f"Error fetching reviews: {str(e)}")
        return JsonResponse({"status": 500, "message": "Internal Server Error"})
