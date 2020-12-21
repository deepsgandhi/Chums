package com.chums;

import com.chums.CachedData;
import com.chums.Json;

import java.util.Date;



public class Person {
    private int id;
    private int householdId;
//    private Name name;

    private String membershipStatus;
    private String photo;

    public int getId() {
        return id;
    }
    public String getPhoto() {
        return photo;
    }
//    public Name getName() {  return name;  }
    public int getHouseholdId() { return householdId; }
    public String getMembershipStatus() {
        return membershipStatus;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }
//    public void setName(Name name) {  this.name = name; }
    public void setId(int id) {
        this.id = id;
    }
    public void setHouseholdId(int householdId) { this.householdId = householdId; }
    public void setMembershipStatus(String membershipStatus) {  this.membershipStatus = membershipStatus; }

//    public Person save()
//    {
//        Person result = null;
//        try {
//            People people = new People();
//            people.add(this);
//            people = people.save();
//            result = people.get(0);
//        } catch (Exception ex) {
//            ErrorLogs.error(ex);
//        }
//        return result;
//    }

}
