# actions.py

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

class ActionProvideCampusInfo(Action):

    def name(self) -> str:
        return "action_provide_campus_info"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: dict) -> list:
        
        # Custom response for campus information
        campus_info = "Banasthali Vidyapith aims at synthesizing spiritual values and scientific achievements..."
        dispatcher.utter_message(text=campus_info)

        return []
