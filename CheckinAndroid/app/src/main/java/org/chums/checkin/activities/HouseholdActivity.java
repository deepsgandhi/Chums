package org.chums.checkin.activities;

import android.app.ActionBar;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ExpandableListView;

import org.chums.checkin.R;
import org.chums.checkin.adapters.HouseholdMemberAdapter;
import org.chums.checkin.helpers.AnalyticsHelper;
import org.chums.checkin.helpers.CachedData;
import org.chums.checkin.models.People;


public class HouseholdActivity extends Activity {
    private People members;
    ExpandableListView memberList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_household);
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

    public void onResume() {
        super.onResume();
        load();

    }

    private void load()
    {
        memberList = (ExpandableListView) findViewById(R.id.memberList);
        memberList.setOnGroupExpandListener(new ExpandableListView.OnGroupExpandListener() {
            int previousGroup = -1;

            @Override
            public void onGroupExpand(int groupPosition) {
                CachedData.CheckinPersonId = CachedData.HouseholdMembers.get(groupPosition).getId();
                if(groupPosition != previousGroup) memberList.collapseGroup(previousGroup);
                previousGroup = groupPosition;
            }
        });
        final HouseholdMemberAdapter adapter = new HouseholdMemberAdapter(HouseholdActivity.this, CachedData.HouseholdMembers);
        memberList.setAdapter(adapter);

        final Button checkinButton = (Button) findViewById(R.id.checkinButton);
        checkinButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {  checkin();  }
        });

        final Button addGuestButton = (Button) findViewById(R.id.addGuestButton);
        addGuestButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {  addGuest();  }
        });
    }

    private void checkin()
    {
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                AnalyticsHelper.logCheckin(CachedData.PendingVisits.size());
                CachedData.PendingVisits.checkin();
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        nextScreen();
                    }
                });
            }
        });
        thread.start();
    }

    private void addGuest()
    {
        Intent browser = new Intent(HouseholdActivity.this, GuestActivity.class);
        startActivity(browser);
    }



    public void groupButtonClickHandler(View v)
    {
        View parent = (View)v.getParent().getParent();
        CachedData.ServiceTimeId = (int)v.getTag();
        //CachedData.CheckinPersonId = (int)parent.getTag();
        selectGroup();

    }

    private void selectGroup()
    {
        Intent browser = new Intent(HouseholdActivity.this, GroupActivity.class);
        startActivity(browser);
    }

    private void nextScreen()
    {
        Intent browser = new Intent(HouseholdActivity.this, PrintActivity.class);
        //browser.setFlags(Intent.FLAG_ACTIVITY_REORDER_TO_FRONT);
        startActivity(browser);
    }






}
