package helper

import (
	"apis/config"
	"apis/models"
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateStaff(staff models.Staff) error {
	if staff.ID == primitive.NilObjectID {
		staff.ID = primitive.NewObjectID()
	}

	_, err := config.Collection.InsertOne(context.Background(), staff)
	if err != nil {
		return fmt.Errorf("cannot insert staff: %v", err)
	}

	fmt.Println("Staff created successfully")
	return nil
}

func GetAllStaffs() ([]primitive.M, error) {
	cursor, err := config.Collection.Find(context.Background(), bson.D{})
	if err != nil {
		return nil, fmt.Errorf("cannot read staffs: %v", err)
	}

	defer cursor.Close(context.Background())

	var staffs []primitive.M
	for cursor.Next(context.Background()) {
		var staff primitive.M
		if err = cursor.Decode(&staff); err != nil {
			return nil, fmt.Errorf("cannot decode staff: %v", err)
		}
		staffs = append(staffs, staff)
	}
	return staffs, nil
}

func UpdateRole(id string, role string) error {
	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return fmt.Errorf("cannot convert id: %v", err)
	}

	filter := bson.M{"_id": objectID}
	update := bson.M{"$set": bson.M{"role": role}}
	result, err := config.Collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		return fmt.Errorf("cannot update role: %v", err)
	}
	fmt.Println("Updated role successfully", result)
	return nil
}
