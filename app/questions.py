questions_data = {
    "I": [
        "Jaki jest skład narodowościowy mieszkańców rejonu solecznickiego – w procentach?",
        "Czy decyzja o wycięciu dużego fragmentu Puszczy Rudnickiej na potrzeby budowy tam infrastruktury wojskowej jest słuszna?",
        # Add more questions...
    ],
    "II": [
        "Czy Polska jest według Pana/Pani bardziej mostem czy murem?",
        # Add more questions...
    ],
    # Continue for other topics...
}

def get_question(topic, index):
    return questions_data.get(topic, [])[index]
