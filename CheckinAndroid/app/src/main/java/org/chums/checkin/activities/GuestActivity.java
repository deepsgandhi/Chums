package org.chums.checkin.activities;

import android.app.ActionBar;
import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import org.chums.checkin.R;
import org.chums.checkin.helpers.CachedData;
import org.chums.checkin.models.Name;
import org.chums.checkin.models.People;
import org.chums.checkin.models.Person;
import org.chums.checkin.models.accessManagement.LoginRequest;
import org.chums.checkin.models.accessManagement.LoginResponse;

public class GuestActivity extends Activity {

    String firstName;
    String lastName;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_guest);
        goFullScreen();
    }

    private void goFullScreen()
    {
        ActionBar actionBar = getActionBar();
        if (actionBar != null) actionBar.hide();
        View mContentView = findViewById(R.id.fullscreen_content);
        mContentView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_LOW_PROFILE | View.SYSTEM_UI_FLAG_FULLSCREEN | View.SYSTEM_UI_FLAG_LAYOUT_STABLE | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION  | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION);
        mContentView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {  goFullScreen();  }
        });
    }
    public View.OnClickListener handleClick()
    {
        return new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                EditText firstNameText = (EditText) findViewById(R.id.firstNameText);
                EditText lastNameText = (EditText) findViewById(R.id.lastNameText);
                firstName = firstNameText.getText().toString();
                lastName = lastNameText.getText().toString();

                if (firstName.isEmpty() || firstName.equals(null))  Toast.makeText(GuestActivity.this, "Please enter your a first name", Toast.LENGTH_LONG).show();
                else if (lastName.isEmpty() || lastName.equals(null)) Toast.makeText(GuestActivity.this, "Please enter your password", Toast.LENGTH_LONG).show();
                else submit();
            }
        };
    }

    public void onResume() {
        super.onResume();
        Button addButton = (Button) findViewById(R.id.addButton);
        addButton.setOnClickListener(handleClick());

    }





    private void submit()
    {
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                People people = People.searchName(firstName + " " + lastName);
                Person person = null;
                for (Person p : people) if (p.getMembershipStatus()!="Member") person=p;
                if (person==null) {
                    Name name = new Name();
                    name.setFirst(firstName);
                    name.setLast(lastName);
                    name.setDisplayName(firstName + " " + lastName);
                    person = new Person();
                    person.setName(name);
                    person = person.save();
                }
                CachedData.HouseholdMembers.add(person);
                finish();
            }
        });
        thread.start();

    }




}
