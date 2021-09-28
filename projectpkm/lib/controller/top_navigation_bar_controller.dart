import 'package:flutter/material.dart';
// Import the firebase_core and cloud_firestore plugin
// ignore: unused_import
import 'package:firebase_core/firebase_core.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class ReadDataUser extends StatelessWidget {
  final String documentId = 'Otq2epKECQbo5w4IhBh4';

  const ReadDataUser({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    CollectionReference auth = FirebaseFirestore.instance.collection('Auth');

    return FutureBuilder<DocumentSnapshot>(
        future: auth.doc(documentId).get(),
        builder:
            (BuildContext context, AsyncSnapshot<DocumentSnapshot> snapshot) {
          if (snapshot.hasError) {
            return const Text("Something Went wrong !");
          }
          if (snapshot.hasData && !snapshot.data!.exists) {
            return const Text("Document Does Not Exist");
          }
          if (snapshot.connectionState == ConnectionState.done) {
            Map<String, dynamic> data =
                snapshot.data!.data() as Map<String, dynamic>;
            return Text("Full Name: ${data['Name']}");
          }
          return const Text("Loading");
        });
  }
}
