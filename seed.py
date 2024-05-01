import requests
import random

CONCEPTNET_URL='http://api.conceptnet.io/query'
LANGUAGES=['en','fr']
RELATIONS = [
    '/r/RelatedTo', '/r/IsA', '/r/PartOf', '/r/HasA', '/r/UsedFor', 
    '/r/CapableOf', '/r/AtLocation', '/r/Causes', '/r/HasSubevent', 
    '/r/HasProperty', '/r/HasPrerequisite', '/r/HasFirstSubevent', 
    '/r/HasLastSubevent', '/r/MotivatedByGoal', '/r/ObstructedBy', 
    '/r/Desires', '/r/CreatedBy', '/r/Synonym', '/r/Antonym', 
    '/r/DistinctFrom', '/r/DerivedFrom', '/r/SymbolOf', '/r/DefinedAs', 
    '/r/MannerOf', '/r/LocatedNear', '/r/HasContext', '/r/SimilarTo', 
    '/r/EtymologicallyRelatedTo', '/r/EtymologicallyDerivedFrom', 
    '/r/CausesDesire', '/r/MadeOf', '/r/ReceivesAction', '/r/ExternalURL'
]

FACTS=100
MIN_CONCEPTS=40
MIN_RELATIONS=10

def fetch_facts():
    collected_facts=[]
    concepts=set()
    relations=set()
    while len(collected_facts)<FACTS or len(concepts)<MIN_CONCEPTS or len(relations)<MIN_RELATIONS:
        relations=random.choice(RELATIONS)
        lang=random.choice(LANGUAGES)
        response=requests.get(CONCEPTNET_URL,params={
            'rel':relations,
            'limit':1000,
            'lang':lang
        }).json()
        for edge in response.get('edges',[]):
            start=edge['start']['label']
            end= edge['end']['label']
            rel= edge['rel']['label']
            if start not in concepts or end not in concepts or relations not in relations:
               fact=(start,rel,end)
               if fact not in collected_facts:
                   collected_facts.append(fact)
                   concepts.update([start,end])
                   relations.add([relations])
            if len(collected_facts)>=FACTS and len(concepts)>=MIN_CONCEPTS and len(relations)>=MIN_RELATIONS:
                break

    return collected_facts
def generate_html_table(collected_facts):
    html="<table border='1'><tr><th>Start</th><th>Relation</th><th>End</th></tr>"
    for start, relation, end in facts:
        html += f"<tr><td>{start}</td><td>{relation}</td><td>{end}</td></tr>"
    html += "</table>"
    return html


facts = fetch_facts()
html_table = generate_html_table(facts)
print(html_table)
