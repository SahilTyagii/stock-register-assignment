package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Staff struct {
	ID     primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name   string             `json:"name,omitempty" bson:"name,omitempty"`
	Mobile string             `json:"mobile,omitempty" bson:"mobile,omitempty"`
	Store  string             `json:"store,omitempty" bson:"store,omitempty"`
	Role   string             `json:"role,omitempty" bson:"role,omitempty"`
}
